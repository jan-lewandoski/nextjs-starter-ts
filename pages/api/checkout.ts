import { apolloClient, authorizedApolloClient } from 'graphql/apolloClient'
import {
  CreateOrderDocument,
  CreateOrderMutationVariables,
  GetCheckoutProductsBySlugsDocument,
  GetCheckoutProductsBySlugsQuery,
  GetCheckoutProductsBySlugsQueryVariables,
  OrderStatus,
} from 'graphql/generated/graphql'
import { NextApiHandler } from 'next'
import { Stripe } from 'stripe'

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_API_KEY

  if (!stripeKey) {
    res.status(500).json({ message: 'Missing STRIPE_SECRET_KEY' })
    return
  }

  const body = req.body as {
    slug: string
    amount: number
  }[]

  const { data } = await apolloClient.query<
    GetCheckoutProductsBySlugsQuery,
    GetCheckoutProductsBySlugsQueryVariables
  >({
    query: GetCheckoutProductsBySlugsDocument,
    variables: { slugs: body.map((item) => item.slug) },
  })

  const stripe = new Stripe(stripeKey, { apiVersion: '2020-08-27' })

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'pl',
    payment_method_types: ['p24', 'card'],
    success_url: process.env.STRIPE_SUCCESS_REDIRECT_URL || '',
    cancel_url: process.env.STRIPE_CANCEL_REDIRECT_URL || '',
    line_items: data.products.map((product) => ({
      price_data: {
        currency: 'PLN',
        unit_amount: product.price,
        product_data: {
          name: product.name,
          images: product.images.map((img) => img.url),
          metadata: { slug: product.slug },
        },
      },
      quantity: body.find((item) => item.slug === product.slug)?.amount,
    })),
  })

  await createOrder({
    order: {
      email: 'dummy@user.com',
      total: stripeCheckoutSession.amount_total!,
      stripeCheckoutId: stripeCheckoutSession.id,
      orderStatus: OrderStatus.Created,
      orderItems: {
        create: data.products.map((product) => {
          const amount = body.find((item) => item.slug === product.slug)?.amount
          return {
            quantity: amount!,
            total: amount! * product.price,
            product: {
              connect: {
                slug: product.slug,
              },
            },
          }
        }),
      },
    },
  })

  return res.status(201).json({ session: stripeCheckoutSession })
}

export default checkoutHandler

const createOrder = async (variables: CreateOrderMutationVariables) => {
  await authorizedApolloClient.mutate({
    mutation: CreateOrderDocument,
    variables,
  })
}

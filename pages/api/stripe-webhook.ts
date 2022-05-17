import { StripeWebhookEvents } from '@customTypes/stripeEvents'
import { apolloClient } from 'graphql/apolloClient'
import {
  OrderStatus,
  UpdateOrderStatusDocument,
  UpdateOrderStatusMutation,
  UpdateOrderStatusMutationVariables,
} from 'graphql/generated/graphql'
import { NextApiHandler } from 'next'

const stripeWebhook: NextApiHandler = async (req, res) => {
  // TODO Verify signing secret

  const event = req.body as StripeWebhookEvents

  switch (event.type) {
    case 'checkout.session.completed':
      await changeOrderStatus({ stripeCheckoutId: event.data.object.id, status: OrderStatus.Paid })
      break
    case 'checkout.session.expired':
      await changeOrderStatus({
        stripeCheckoutId: event.data.object.id,
        status: OrderStatus.Cancelled,
      })
      break
  }

  res.status(204).end()
}

export default stripeWebhook

const changeOrderStatus = async (variables: UpdateOrderStatusMutationVariables) => {
  await apolloClient.mutate<UpdateOrderStatusMutation>({
    mutation: UpdateOrderStatusDocument,
    variables,
  })
}

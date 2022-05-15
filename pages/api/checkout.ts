import { NextApiHandler } from 'next'
import { Stripe } from 'stripe'

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_API_KEY

  if (!stripeKey) {
    res.status(500).json({ message: 'Missing STRIPE_SECRET_KEY' })
    return
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2020-08-27' })

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'pl',
    payment_method_types: ['p24', 'card'],
    success_url: process.env.STRIPE_SUCCESS_REDIRECT_URL || '',
    cancel_url: process.env.STRIPE_CANCEL_REDIRECT_URL || '',
    line_items: req.body,
  })

  return res.status(201).json({ session: stripeCheckoutSession })
}

export default checkoutHandler

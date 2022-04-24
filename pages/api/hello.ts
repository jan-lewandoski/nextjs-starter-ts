// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST').status(405).json({ error: 'HTTP method should be POST' })
    return
  }

  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY

  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    return res.status(500).json({
      error: 'Env vars missing',
    })
  }

  const email = req.body.email

  if (typeof email !== 'string') {
    res.status(400).json({})
  }

  const mailerliteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        email,
      }),
    },
  )

  if (!mailerliteResponse.ok) {
    return res.status(500).json({
      error: 'Error while subscribing to the newsletter',
    })
  }

  return res.status(201).json({ message: `Successfully subscribed ${email} to the newsletter` })
}

export default handler

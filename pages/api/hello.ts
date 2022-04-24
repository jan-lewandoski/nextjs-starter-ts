// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next'
import { config } from '../../config'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST').status(405).json({ error: 'HTTP method should be POST' })
    return
  }

  const email = req.body.email

  if (typeof email !== 'string') {
    res.status(400).json({})
  }

  const mailerliteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${config.MAILERLITE_GROUP_ID}/subscribers`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': config.MAILERLITE_API_KEY,
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

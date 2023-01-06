// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverPusher } from '../../pusher'
import redis from '../../redis'
import { Message } from '../../typings'

type Data = {
  message: Message
}

type ErrorData = {
  body: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) {
  if (req.method !== 'POST') {
    res.status(405).json({ body: 'Method not allowed' })
    return
  }

  const { message }: { message: Message } = req.body

  const newMessage = {
    ...message,
    // replace timestamp of the user to the timestamp of the server
    created_at: Date.now(),
  }

  // Push to upstash redis db
  await redis.hset('messages', message.id, JSON.stringify(newMessage))
  serverPusher.trigger('message', 'new-message', newMessage)

  res.status(200).json({ message: newMessage })
}

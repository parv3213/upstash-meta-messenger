'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { clientPusher } from '../pusher'
import { Message } from '../typings'
import { fetcher } from '../utils/fetchMessages'
import MessageComponent from './MessageComponent'

const MessageList = ({ initialMessages }: { initialMessages: Message[] }) => {
  const { data: messages, error, mutate } = useSWR<Message[]>('/api/getMessages', fetcher)

  useEffect(() => {
    const channel = clientPusher.subscribe('messages')

    channel.bind('new-message', async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return

      if (data) {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        })
      } else {
        mutate(fetcher)
      }
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages, clientPusher, mutate])

  return (
    <div className="xl:max-2-4xl mx-auto max-w-2xl space-y-5 px-5 pt-8 pb-32">
      {(messages || messages)?.map((message) => {
        return <MessageComponent key={message.id} message={message} />
      })}
    </div>
  )
}

export default MessageList

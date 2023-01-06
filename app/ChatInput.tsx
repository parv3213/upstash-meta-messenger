'use client'

import { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '../typings'
import useSWR from 'swr'
import { fetcher } from '../utils/fetchMessages'

const ChatInput = () => {
  const [input, setInput] = useState('')
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input) return

    const messageToSend = input

    setInput('')

    const id = uuid()

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: 'Rahul',
      profilePic:
        'https://scontent.fbho2-1.fna.fbcdn.net/v/t1.6435-9/97453481_10157464396582371_2461148751759147008_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=A9O-273hsbEAX_dKrds&tn=zu-MpGMgszmc-Kh5&_nc_ht=scontent.fbho2-1.fna&oh=00_AfD6y1d60zHq7Af_TcugXK_qoRtjter5gzpErQtw53yDiA&oe=63DDD9B3',
      email: 'something@xo.com',
    }

    const uploadMessageToUpstash = async () => {
      const res = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()

      return [data.message, ...messages!]
    }

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    })
  }

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 flex w-full space-x-2 border-t border-gray-100 bg-white px-10 py-5">
      <input
        type="text"
        className="flex-1 rounded border  border-gray-300 py-3 px-5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Enter a message"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button
        type="submit"
        disabled={!input}
        className="rounded bg-blue-400 py-2 px-4 font-bold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
        Send
      </button>
    </form>
  )
}

export default ChatInput

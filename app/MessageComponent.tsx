import Image from 'next/image'
import React from 'react'
import { Message } from '../typings'

type Props = {
  message: Message
}

const MessageComponent = ({ message }: Props) => {
  const isUser = false

  return (
    <div>
      <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
        <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
          <Image src={message.profilePic} alt="profile photo" width={50} height={10} />
        </div>
        <div className="flex flex-col">
          <p
            className={`px-[2px] pb-[2px] text-[0.65rem] ${
              isUser ? 'text-right text-blue-400' : 'text-left text-red-400'
            }`}>
            {message.username}
          </p>
          <div className="flex items-end">
            <p
              className={`w-fit rounded-lg ${
                isUser ? 'order-2 ml-auto bg-blue-400' : 'bg-red-400'
              } px-3 py-2 text-white`}>
              {message.message}
            </p>
            <p className={`px-2 text-[0.65rem] italic text-gray-300 ${isUser && 'text-right'}`}>{message.created_at}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageComponent

import { Message } from '../typings'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

const HomePage = async () => {
  const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000/'}/api/getMessages`)
  const data = await res.json()
  const messages: Message[] = data.messages

  return (
    <main className="">
      {/* Message List */}
      <MessageList initialMessages={messages} />
      {/* ChatInput */}
      <ChatInput />
    </main>
  )
}

export default HomePage

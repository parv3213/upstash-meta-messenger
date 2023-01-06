import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

const Header = () => {
  const session = true

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            src="https://links.papareact.com/jne"
            alt="profile photo"
            height={10}
            width={50}
            className="rounded-full mx-2 object-contain"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">Rahul</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    )
  }
  return (
    <header className="sticky top-0 z-50 bg-white justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col space-y-5 items-center">
        <div className="flex items-center space-x-2">
          <Image src="https://links.papareact.com/jne" alt="logo" height={10} width={50} />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>
        <Link href="/auth/signin" className="py-2 px-4 rounded bg-blue-400 hover:bg-blue-500 text-white font-bold">
          Sign in
        </Link>
      </div>
    </header>
  )
}

export default Header

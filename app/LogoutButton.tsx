'use client'

const LogoutButton = () => {
  return (
    <button
      onClick={() => console.log('Sign out')}
      className="py-2 px-4 rounded bg-blue-400 hover:bg-blue-500 text-white font-bold">
      Sign out
    </button>
  )
}

export default LogoutButton

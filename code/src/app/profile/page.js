import { useSession, signIn, signOut } from 'next-auth/react'

export default function UserProfile () {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>Welcome, { session.user.email }!</p>
        <button onClick={ () => signOut() }>Sign out</button>
      </div>
    )
  }
  return (
    <button onClick={ () => signIn() }>Sign in</button>
  )
}

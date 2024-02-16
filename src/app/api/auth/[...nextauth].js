import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
      },
      authorize: async (credentials) => {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: credentials.username }),
        })

        const user = await response.json()

        if (response.ok && user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  // Configure session, JWT here as needed
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // Add user data to the JWT token
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      // Add user data to the session
      session.user.id = token.id
      return session
    },
  },
})

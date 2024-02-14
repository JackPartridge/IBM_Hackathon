'use client';

import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { useRouter } from 'next/navigation'

export default function Login () {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: false, // Prevent NextAuth from redirecting automatically
      username,
      callbackUrl: `${ window.location.origin }`, // Redirect to home page after login
    })

    if (result.error) {
      alert(result.error)
    } else {
      // Redirect the user after successfully logging in
      router.push(result.url || '/')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={ handleSubmit }>
          <div className="mt-4">
            <label className="block" htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={ username }
              onChange={ (e) => setUsername(e.target.value) }
              required
            />
          </div>
          <div className="flex items-baseline justify-between">
            <button
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

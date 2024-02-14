// pages/api/login.js
import db from '../../../lib/db' // Adjust the path to your db module

export async function POST (request) {
  try {
    const { username } = await request.json() // Ensure proper destructuring of the payload
    const query = 'SELECT * FROM users WHERE username = ?'
    const results = await db.query(query, [username])

    if (results.length === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404, headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(results[0]), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Failed to fetch user:', error)
    return new Response(JSON.stringify({ message: 'Failed to fetch user' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    })
  }
}

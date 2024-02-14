import db from '../../../lib/db'

export async function POST (request) {
  // send a json body just with 'query'
  const { query } = await request.json()
  try {
    const results = await db.query(query)
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return new Response(JSON.stringify({ message: 'Failed to fetch data' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    })
  }
}
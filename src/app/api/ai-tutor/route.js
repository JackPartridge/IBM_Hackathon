import db from '../../../lib/db'

export async function POST (request) {
  try {
    const { objective_type_id, user_id, ai_comment } = await request.json()

    if (!objective_type_id || !ai_comment || !user_id) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Check if a row with the given objective_type_id and user_id already exists
    const checkQuery = 'SELECT * FROM objectives WHERE objective_type_id = ? AND user_id = ?'
    const checkResults = await db.query(checkQuery, [objective_type_id, user_id])

    let query, results
    if (checkResults.length > 0) {
      // If a row exists, update it
      query = 'UPDATE objectives SET ai_comment = ? WHERE objective_type_id = ? AND user_id = ?'
      results = await db.query(query, [ai_comment, objective_type_id, user_id])
    } else {
      // If no row exists, insert a new one (optional, based on your requirements)
      query = 'INSERT INTO objectives (objective_type_id, user_id, ai_comment) VALUES (?, ?, ?)'
      results = await db.query(query, [objective_type_id, user_id, ai_comment])
    }

    return new Response(JSON.stringify({ message: 'AI comment updated', results }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to update objective:', error)
    return new Response(JSON.stringify({ message: 'Failed to update objective', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

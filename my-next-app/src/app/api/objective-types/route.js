// src/app/api/objective-categories.js
import db from '../../../lib/db' // Adjust the import path based on your file structure

export async function GET () {
  try {
    const results = await db.query('SELECT * FROM objective_types')
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to fetch objective types:', error)
    return new Response(JSON.stringify({ message: 'Failed to fetch data' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    })
  }
}


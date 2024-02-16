// src/app/api/objectives/route.js

import db from '../../../lib/db'
import { NextResponse } from 'next/server' // Adjust the import path based on your file structure
export async function GET () {
  try {
    const results = await db.query('SELECT * FROM objectives')
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to fetch objectives:', error)
    return new Response(JSON.stringify({ message: 'Failed to fetch data' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    })
  }
}

// TEST POST CODE ------------------------------------------------------------------------------------------------
// export async function POST (request) {
//   const objective_type_id = 1
//   const user_id = 1
//   const description = 'This is a new objective'
//
//   try {
//     const query = 'INSERT INTO objectives (objective_type_id, user_id, description) VALUES (?, ?, ?)';
//     const results = await db.query(query, [objective_type_id, user_id, description]);
//     return new Response(JSON.stringify({ message: 'Objective created', results }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Failed to create objective:', error);
//     // Assuming console.error is your way of logging errors, otherwise use a proper logger
//     return new Response(JSON.stringify({ message: 'Failed to create objective', error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
// ----------------------------------------------------------------------------------------------------------------

export async function POST (request) {
  // get current date and time for logging
  const current_datetime = new Date()
  const formatted_date = current_datetime.getFullYear() + '-' + (
    current_datetime.getMonth() + 1
  ) + '-' + current_datetime.getDate() + ' ' + current_datetime.getHours() + ':' + current_datetime.getMinutes() + ':' + current_datetime.getSeconds()

  try {
    const { objective_type_id, description, user_id } = await request.json()

    // Basic validation (example - you should replace with more specific checks)
    if (!objective_type_id || !description || !user_id) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400, // Bad Request
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Further validation and sanitization can be performed here
    // Ensure objective_type_id, description, and user_id are of expected types and sanitized

    const query = 'INSERT INTO objectives (objective_type_id, user_id, description, description_date) VALUES (?, ?, ?, ?)'
    const results = await db.query(query, [objective_type_id, user_id, description, formatted_date])

    return new Response(JSON.stringify({ message: 'Objective created', results }), {
      status: 201, // Successfully created
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to create objective:', error)
    // More detailed error handling can be performed here based on the error type

    let errorMessage = 'Failed to create objective'
    let statusCode = 500 // Internal Server Error

    return new Response(JSON.stringify({ message: errorMessage, error: error.message }), {
      status: statusCode, headers: { 'Content-Type': 'application/json' },
    })
  }
}





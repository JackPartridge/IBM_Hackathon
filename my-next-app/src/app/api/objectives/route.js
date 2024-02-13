// src/app/api/objectives/route.js

import db from '../../../lib/db'
import { NextResponse } from 'next/server' // Adjust the import path based on your file structure
const fs = require('fs')

const logFile = './api_logs.txt'
export const logStream = fs.createWriteStream(logFile, { flags: 'a' }) //  'a' for appending
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

// export async function POST (request) {
//
//   const { objective_type_id, description, user_id } = await request.json()
//
//   if (!objective_type_id || !description || !user_id) {
//     throw new Error('Invalid input')
//   }
//
//   try {
//     // put code in place to stop sql injection
//     if (isNaN(objective_type_id) || isNaN(user_id)) {
//       throw new Error('Invalid input')
//     }
//     const query = `INSERT INTO objectives (objective_type_id, user_id, description) VALUES (?, ?, ?)`
//     const [result] = await db.query(query, [objective_type_id, user_id, description])
//
//     if (result.affectedRows === 0) {
//       throw new Error('Failed to create objective')
//     }
//
//     return new Response(JSON.stringify({
//       message: 'Objective created successfully',
//       insertedId: result.insertId // Optionally provide inserted ID,
//     }), {
//       headers: { 'Content-Type': 'application/json' },
//     })
//
//   } catch (error) {
//     console.error('Failed to create objective:', error)
//
//     // Return a standardized error response format
//     return new Response(JSON.stringify({
//       message: 'Failed to create objective',
//       error: error.message
//     }), {
//       status: 500, // Indicate a server-side error
//       headers: { 'Content-Type': 'application/json' },
//     })
//   }
// }

// export async function POST (request) {
//   const { objective_type_id, description, user_id } = await request.json();
//
//   try {
//     const query = `INSERT INTO objectives (objective_type_id, user_id, description) VALUES (?, ?, ?)`;
//     const [result] = await db.query(query, [objective_type_id, user_id, description]);
//
//     if (result.affectedRows === 0) {
//       throw new Error('Failed to create objective');
//     }
//
//     // Respond with successful creation message
//     return new Response(JSON.stringify({
//       message: 'Objective created successfully',
//       insertedId: result.insertId // Optionally provide inserted ID,
//     }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//
//   } catch (error) {
//     console.error('Failed to create objective:', error);
//
//     // Return a standardized error response format
//     return new Response(JSON.stringify({
//       message: 'Failed to create objective',
//       error: error.message
//     }), {
//       status: 500, // Indicate a server-side error
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// export async function POST (request) {
//   const user_id = 1 // Hardcoded user_id
//   const objective_type_id = 1 // Hardcoded objective_type_id
//   const description = 'This is a new objective'
//
//   try {
//     const query = 'INSERT INTO objectives (objective_type_id, user_id, description) VALUES (?, ?, ?)'
//     await db.query(query, [objective_type_id, user_id, description])
//     return new Response(JSON.stringify({ message: 'Objective created' }), {
//       headers: { 'Content-Type': 'application/json' },
//     })
//   } catch (error) {
//     console.error('Failed to create objective:', error)
//     logStream.write(`Failed to create objective: ${ error }\n`)
//
//     // Return a more informative error message if possible
//     return new Response(JSON.stringify({ message: 'Failed to create objective', error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     })
//   }
// }

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

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     // Extract the data from the request
//     const { objective_type_id, user_id, description } = req.body;
//
//     // Ideally, you would perform your database operation here
//     // For demonstration, simulate a successful operation
//     res.status(200).json({ message: 'Objective created', data: req.body });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end('Method Not Allowed');
//   }
// }

// pages/api/objectives.js
// export default async function handler(req, res) {
//   console.log('Received POST request')
//   if (req.method === 'POST') {
//     const description= req.body;
//
//     // Add your logic to insert data into the database here.
//     // For demonstration, this just sends back what was received.
//     res.status(200).json({ objective_type_id, user_id, description });
//   } else {
//     // Handle any methods other than POST
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end('Method Not Allowed');
//   }
// }

// export async function POST (request) {
//   console.log('Received POST request') // Confirm the request is received
//
//   try {
//     // Assuming 'request' is an instance of an incoming message, such as from Express.js
//     if (!request.body) {
//       console.error('No request body')
//       return new Response(JSON.stringify({ message: 'No data provided' }), {
//         status: 400, // Bad Request
//         headers: { 'Content-Type': 'application/json' },
//       })
//     }
//
//     // Attempt to parse JSON body directly or from request.body if using Express-like framework
//     const data = typeof request.body === 'string' ? JSON.parse(request.body) : request.body
//     const { objective_type_id, user_id, description } = data
//
//     if (!(
//       objective_type_id && user_id && description
//     )) {
//       console.error('Missing data fields')
//       return new Response(JSON.stringify({ message: 'Missing data fields' }), {
//         status: 400, // Bad Request
//         headers: { 'Content-Type': 'application/json' },
//       })
//     }
//
//     const query = 'INSERT INTO objectives (objective_type_id, user_id, description) VALUES (?, ?, ?)'
//     const results = await db.query(query, [objective_type_id, user_id, description])
//     console.log('Objective created', results)
//
//     return new Response(JSON.stringify({ message: 'Objective created', results }), {
//       headers: { 'Content-Type': 'application/json' },
//     })
//   } catch (error) {
//     console.error('Error processing POST request:', error)
//     return new Response(JSON.stringify({ message: 'Failed to create objective', error: error.message }), {
//       status: 500, // Internal Server Error
//       headers: { 'Content-Type': 'application/json' },
//     })
//   }
// }

// export async function POST (request) {
//   const { objective_type_id, description, user_id } = await request.json();
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

export async function POST (request) {
  try {
    const { objective_type_id, description, user_id } = await request.json()
    console.log(objective_type_id, description, user_id)

    // Basic validation (example - you should replace with more specific checks)
    if (!objective_type_id || !description || !user_id) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400, // Bad Request
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Further validation and sanitization can be performed here
    // Ensure objective_type_id, description, and user_id are of expected types and sanitized

    const query = 'INSERT INTO objectives (objective_type_id, user_id, description) VALUES (?, ?, ?)'
    const results = await db.query(query, [objective_type_id, user_id, description])

    return NextResponse.json({ message: 'Objective created', results })
  } catch (error) {
    console.error('Failed to create objective:', error)
    // More detailed error handling can be performed here based on the error type

    let errorMessage = 'Failed to create objective'
    let statusCode = 500 // Internal Server Error

    return new Response(JSON.stringify({ message: errorMessage, error: error.message }), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}



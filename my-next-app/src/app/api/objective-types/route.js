// src/app/api/objective-types/route.js
import db from '../../../lib/db' // Adjust the import path based on your file structure

const fs = require('fs');

const logFile = './api_logs.txt';
const logStream = fs.createWriteStream(logFile, { flags: 'a' }); //  'a' for appending
export async function GET () {
  try {
    const query = `
      SELECT ot.objective_type_id, ot.type, 
      o.objective_id, 
      o.user_id, 
      o.description, 
      o.description_date, 
      o.mid_comment, 
      o.mid_comment_date, 
      o.end_comment, 
      o.end_comment_date, 
      o.mid_tutor_comment, 
      o.mid_tutor_comment_date, 
      o.end_tutor_comment, 
      o.end_tutor_comment_date, 
      o.created_at, 
      o.updated_at 
      FROM objective_types ot
      LEFT JOIN objectives o ON ot.objective_type_id = o.objective_type_id;
    `;

    const results = await db.query(query)
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to fetch objectives:', error)
    logStream.write(`Failed to fetch objectives: ${error}\n`);
    return new Response(JSON.stringify({ message: 'Failed to fetch data' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(request) {
  // Parse the request body to get data
  console.log('Made it to the other POST function');
  const data = await request.json();
  const { objective_type_id, user_id, description } = data;

  try {
    const query = 'INSERT INTO objectives (objective_type_id, user_id, description) VALUES (?, ?, ?)';
    const results = await db.query(query, [objective_type_id, user_id, description]);
    return new Response(JSON.stringify({ message: 'Objective created', results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to create objective:', error);
    return new Response(JSON.stringify({ message: 'Failed to create objective', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}



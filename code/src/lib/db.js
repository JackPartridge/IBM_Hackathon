// src/lib/db.js
import mysql from 'mysql2/promise'

// Database connection configuration
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

async function query (sql, params) {
  let connection
  try {
    connection = await mysql.createConnection(config)
    const [results] = await connection.execute(sql, params)
    return results
  } catch (error) {
    console.error('Database query error:', error)
    throw error // Re-throw to handle it in the calling API route
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

export default { query }

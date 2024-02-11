// src/lib/db.js
import mysql from 'mysql2/promise'

// Database connection configuration
const config = {
  host: 'phpmyadmin.jackpartridge.com',
  user: 'jack',
  password: '%Daddy101@',
  database: 'Hackathon'
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

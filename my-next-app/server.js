const express = require('express')
const next = require('next')
const mysql = require('mysql')
const cors = require('cors')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  // Connect to MySQL
  connection.connect()

  server.use(cors())
  server.use(express.json()) // For parsing application/json

  // Define custom routes here, e.g., for fetching or posting to the database
  server.get('/api/custom-route', (req, res) => {
    // Example custom route logic
  })

  // Fallback to handle Next.js pages and API routes
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${ port }`)
  })
})

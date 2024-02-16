import db from '../../../lib/db'

export async function POST (request) {
  try {
    // Assuming you're sending the data with 'multipart/form-data' content type
    const form = await new FormData(await request.formData())
    const user_id = form.get('user_id') // Or however you're passing the user_id
    const file = form.get('file') // 'file' is the key for the file in the form data

    // Convert the received file (Buffer) directly to a binary buffer
    const fileBuffer = file.buffer

    // Check if required fields are present
    if (!user_id || !fileBuffer) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      })
    }

    // Insert into the database
    const query = 'INSERT INTO user_uploads (user_id, file) VALUES (?, ?)'
    const results = await db.query(query, [user_id, fileBuffer])

    return new Response(JSON.stringify({ message: 'File uploaded', results }), {
      status: 201, headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Failed to upload file:', error)

    let errorMessage = 'Failed to upload file'
    let statusCode = 500 // Internal Server Error

    return new Response(JSON.stringify({ message: errorMessage, error: error.message }), {
      status: statusCode, headers: { 'Content-Type': 'application/json' },
    })
  }
}


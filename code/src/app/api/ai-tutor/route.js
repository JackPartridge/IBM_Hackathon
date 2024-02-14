import db from '../../../lib/db'

export async function POST(request) {
  try {
    // We expect the request to contain objective_type_id, user_id, and the AI comment
    const { objective_type_id, user_id, ai_comment } = await request.json();

    // Ensure all required fields are present
    if (!objective_type_id || !user_id || !ai_comment) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const query = 'UPDATE objectives SET ai_comment = ? WHERE objective_type_id = ? AND user_id = ?';
    const results = await db.query(query, [ai_comment, objective_type_id, user_id]);

    return new Response(JSON.stringify({ message: 'AI comment updated', results }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to update AI comment:', error);
    return new Response(JSON.stringify({ message: 'Failed to update AI comment' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
}

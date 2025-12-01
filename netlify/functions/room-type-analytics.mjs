import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler() {
  try {
    const rows = await sql`
      SELECT
        roomtype,
        COUNT(*) AS room_count,
        AVG(pricepernight) AS avg_price
      FROM rooms
      GROUP BY roomtype
      HAVING COUNT(*) >= 1
      ORDER BY room_count DESC
    `;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify(rows)
    };
  } catch (err) {
    console.error("room-type-analytics error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
}

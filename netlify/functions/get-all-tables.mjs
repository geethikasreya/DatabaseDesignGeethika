import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler() {
  try {
    // Run all 3 queries in parallel using Promise.all
    const [guests, rooms, bookings] = await Promise.all([
      sql`SELECT * FROM guests ORDER BY guestid`,
      sql`SELECT * FROM rooms ORDER BY roomid`,
      sql`SELECT * FROM bookings ORDER BY bookingid`
    ]);

    // Return structured JSON with all table data
    const payload = {
      guests,
      rooms,
      bookings
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify(payload)
    };
  } catch (err) {
    console.error("get-all-tables error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
}

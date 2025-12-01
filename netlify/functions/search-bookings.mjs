import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
  const rawQ = event.queryStringParameters?.q || "";
  const q = rawQ.trim();

  try {
    let rows;

    if (q === "") {
      // No search → all bookings
      rows = await sql`
        SELECT *
        FROM bookings
        ORDER BY bookingid
      `;
    } else {
      // Search by bookingid, guestid, or roomid
      rows = await sql`
        SELECT *
        FROM bookings
        WHERE bookingid ILIKE ${"%" + q + "%"}
           OR guestid   ILIKE ${"%" + q + "%"}
           OR roomid    ILIKE ${"%" + q + "%"}
        ORDER BY bookingid
      `;
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error("search-bookings error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
}

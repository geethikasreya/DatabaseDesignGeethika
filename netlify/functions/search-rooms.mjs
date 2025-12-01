import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
  const rawQ = event.queryStringParameters?.q || "";
  const q = rawQ.trim();

  try {
    let rows;

    if (q === "") {
      // No search → all rooms
      rows = await sql`
        SELECT *
        FROM rooms
        ORDER BY roomid
      `;
    } else {
      // Search by roomtype or roomid
      rows = await sql`
        SELECT *
        FROM rooms
        WHERE roomtype ILIKE ${"%" + q + "%"}
           OR roomid ILIKE ${"%" + q + "%"}
        ORDER BY roomid
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
    console.error("search-rooms error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
}

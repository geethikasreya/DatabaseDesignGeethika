import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
  const rawQ = event.queryStringParameters?.q || "";
  const q = rawQ.trim();

  try {
    let rows;

    if (q === "") {
      // No search term → return ALL guests
      rows = await sql`
        SELECT *
        FROM guests
        ORDER BY name
      `;
    } else {
      // Search by name (partial, case-insensitive)
      rows = await sql`
        SELECT *
        FROM guests
        WHERE name ILIKE ${"%" + q + "%"}
        ORDER BY name
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
    console.error("search-guests error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
}

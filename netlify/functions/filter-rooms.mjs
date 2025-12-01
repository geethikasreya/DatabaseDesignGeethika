import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// Allowed columns for sorting to keep it safe
const ALLOWED_SORT_COLUMNS = ["pricepernight", "roomtype", "roomid"];

export async function handler(event) {
  const params = event.queryStringParameters || {};

  const status = params.status || "";    // e.g. Available / Booked
  const sortBy = params.sortBy || "pricepernight";
  const order = (params.order || "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC";

  // Whitelist sortBy
  const sortColumn = ALLOWED_SORT_COLUMNS.includes(sortBy)
    ? sortBy
    : "pricepernight";

  try {
    let rows;

    if (status) {
      // Filter by status + sort
      rows = await sql`
        SELECT roomid, roomtype, pricepernight, availabilitystatus
        FROM rooms
        WHERE availabilitystatus = ${status}
        ORDER BY ${sql(sortColumn)} ${sql(order)}
      `;
    } else {
      // No filter, just sort
      rows = await sql`
        SELECT roomid, roomtype, pricepernight, availabilitystatus
        FROM rooms
        ORDER BY ${sql(sortColumn)} ${sql(order)}
      `;
    }

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
    console.error("filter-rooms error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
}

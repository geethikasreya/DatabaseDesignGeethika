import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler() {
  try {
    // Total guests
    const guests = await sql`
      SELECT COUNT(*) AS total_guests
      FROM guests
    `;

    // Total rooms + available rooms
    const rooms = await sql`
      SELECT
        COUNT(*) AS total_rooms,
        COUNT(*) FILTER (WHERE availabilitystatus = 'Available') AS available_rooms
      FROM rooms
    `;

    // Total bookings + total revenue
    const bookings = await sql`
      SELECT
        COUNT(*) AS total_bookings,
        COALESCE(SUM(totalcost), 0) AS total_revenue
      FROM bookings
    `;

    // Average room price
    const avgPrice = await sql`
      SELECT COALESCE(AVG(pricepernight), 0) AS avg_room_price
      FROM rooms
    `;

    const stats = {
      total_guests: Number(guests[0].total_guests),
      total_rooms: Number(rooms[0].total_rooms),
      available_rooms: Number(rooms[0].available_rooms),
      total_bookings: Number(bookings[0].total_bookings),
      total_revenue: Number(bookings[0].total_revenue),
      avg_room_price: Number(avgPrice[0].avg_room_price)
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify(stats)
    };
  } catch (err) {
    console.error("stats error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
}

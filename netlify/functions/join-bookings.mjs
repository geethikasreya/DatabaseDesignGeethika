import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler() {
  try {
    const rows = await sql`
      SELECT
        b.bookingid,
        g.name AS guest_name,
        g.email AS guest_email,
        r.roomid,
        r.roomtype,
        r.pricepernight,
        b.checkindate,
        b.checkoutdate,
        b.totalcost
      FROM bookings b
      INNER JOIN guests g ON b.guestid = g.guestid
      INNER JOIN rooms r ON b.roomid = r.roomid
      ORDER BY b.bookingid;
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
    console.error("join-bookings error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
}

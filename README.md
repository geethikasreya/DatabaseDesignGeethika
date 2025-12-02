# 🏨 Hotel Management System – Full Stack Web Application  
Built with **Netlify Serverless Functions + Neon PostgreSQL + HTML/JavaScript**

This project implements a complete full-stack Hotel Management System with a PostgreSQL backend, serverless API endpoints, and a modern frontend that displays Guests, Rooms, and Bookings data.  
All CRUD operations are included, plus an **optional Search Feature** for extra credit.

---

## 🔗 Live Links

| Item | Link |
|------|------|
| **Live Website (Netlify)** | https://hotelmanagementbooking.netlify.app/ |
| **GitHub Repository** | https://github.com/geethikasreya/DatabaseDesignGeethika |

---

# 🎯 Project Overview

This project demonstrates how to build a full-stack application using:

- **Frontend:** HTML + JavaScript  
- **Backend:** Netlify Functions (Node.js + Serverless)  
- **Database:** Neon PostgreSQL  
- **Deployment:** Netlify CI/CD connected to GitHub  

The system manages the core operations of a hotel:

- **Guests** (customer information)  
- **Rooms** (type, pricing, availability)  
- **Bookings** (reservations, dates, cost)  

---

# 🧱 Database Schema (Neon PostgreSQL)

### **Guests Table**
| Column | Type |
|--------|------|
| `guestid` | TEXT (Primary Key) |
| `name` | TEXT |
| `phone` | TEXT |
| `email` | TEXT |

### **Rooms Table**
| Column | Type |
|--------|------|
| `roomid` | TEXT (Primary Key) |
| `roomtype` | TEXT |
| `pricepernight` | NUMERIC |
| `availabilitystatus` | TEXT |

### **Bookings Table**
| Column | Type |
|--------|------|
| `bookingid` | TEXT (Primary Key) |
| `guestid` | TEXT (Foreign Key) |
| `roomid` | TEXT (Foreign Key) |
| `checkindate` | DATE |
| `checkoutdate` | DATE |
| `totalcost` | NUMERIC |

---

# 🚀 API Endpoints (Serverless Functions)

All backend routes are located in  
`/netlify/functions/*.mjs`

---


```bash
GET /.netlify/functions/get-guests


GET /.netlify/functions/search-guests?q=Geethika


GET /.netlify/functions/get-guests-by-id?id=G001


POST /.netlify/functions/create-guests
Content-Type: application/json

{
  "guestid": "G010",
  "name": "John",
  "phone": "555-9000",
  "email": "john@example.com"
}


PUT /.netlify/functions/update-guests?id=G001


DELETE /.netlify/functions/delete-guests?id=G001


Get all rooms
GET /.netlify/functions/get-rooms

Search rooms (room type or room number)
GET /.netlify/functions/search-rooms?q=Double

Get room by ID
GET /.netlify/functions/get-rooms-by-id?id=R101

Create room
POST /.netlify/functions/create-rooms

Update room
PUT /.netlify/functions/update-rooms?id=R102

Delete room
DELETE /.netlify/functions/delete-rooms?id=R103

Get all bookings
GET /.netlify/functions/get-bookings

Search bookings (bookingid, guestid, roomid)
GET /.netlify/functions/search-bookings?q=B001

Get booking by ID
GET /.netlify/functions/get-bookings-by-id?id=B001

Create booking
POST /.netlify/functions/create-bookings

Update booking
PUT /.netlify/functions/update-bookings?id=B001

Delete booking
DELETE /.netlify/functions/delete-bookings?id=B001

##🌐 Frontend Functionality
The frontend (public/index.html) is a dynamic single-page interface that interacts with the API endpoints:

✔ Displays all Guests / Rooms / Bookings

✔ Search bars for each section:

Guests → search by name

Rooms → search by type or room number

Bookings → search by bookingid / guestid / roomid

✔ Clear button resets results

✔ Uses fetch() to call serverless API endpoints

✔ Dynamic rendering using JavaScript templates.

⭐ OPTIONAL FEATURE (Fully Implemented) – SEARCH
The search functionality is implemented via three dedicated serverless functions (search-guests.mjs, search-rooms.mjs, search-bookings.mjs) that perform case-insensitive partial matching using the PostgreSQL ILIKE operator:

ILIKE '%query%'

The frontend search boxes connect to these endpoints and update the UI dynamically. This meets the optional "Search" / "Advanced Query" requirement.


# 📘 Lecture 7 – SQL Part 1: Data Manipulation (Completed)

Lecture 7 covers:

✔ SELECT Queries  
✔ DISTINCT  
✔ WHERE Filtering  
✔ ORDER BY Sorting  
✔ Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)  
✔ GROUP BY & HAVING  
✔ New API Endpoints  
✔ Stats Dashboard  
✔ Category Analytics  
✔ Filter Endpoints  
✔ All integrated with Netlify Functions  

---

## ✅ **1. SELECT Queries (Basic Queries)**

Implemented and tested using Neon SQL editor.

Examples used in database:

```sql
SELECT * FROM Guests;
SELECT * FROM Rooms;
SELECT * FROM Bookings;
SELECT DISTINCT roomtype FROM Rooms;
SELECT guestid, name AS guest_name FROM Guests;



✅ 2. WHERE Filtering (API Implementation)

ndpoint: Filter Rooms by Status / Type
GET /.netlify/functions/filter-rooms?status=Available
GET /.netlify/functions/filter-rooms?type=Double

Endpoint: Filter Rooms by Status / Type
GET /.netlify/functions/filter-rooms?status=Available
GET /.netlify/functions/filter-rooms?type=Double

✅ 3. ORDER BY Sorting

Sorting implemented inside filter endpoint:

GET /.netlify/functions/filter-rooms?sortBy=pricepernight&order=DESC



✅ 4. Aggregate Functions (Dashboard Stats)

Created stats API endpoint:

Endpoint:
GET /.netlify/functions/stats


✅ 5. GROUP BY Analytics

Created analytics endpoint for categories:

Endpoint: Room Type Analytics
GET /.netlify/functions/room-type-analytics



📘 Lecture 8 – JOINS (SQL Part 2) — Completed ✔

Lecture 8 requires:

✔ INNER JOIN
✔ LEFT JOIN
✔ JOIN API endpoints
✔ Displaying JOIN results
✔ Using JOINs to combine data from multiple tables

All requirements were successfully implemented.

✅ 1. INNER JOIN – Booking Details (Required)

Created endpoint joining:

Bookings

Guests

Rooms

Endpoint:
GET /.netlify/functions/join-bookings

Returns:

Booking info

Guest name + email

Room type + price

Example:

{
  "bookingid": "B001",
  "guest_name": "Subhash",
  "guest_email": "subhash@example.com",
  "roomtype": "Double",
  "pricepernight": "120.00"
}

✅ 2. LEFT JOIN – Guests With or Without Bookings (Required)

Shows all guests, including those without bookings.

Endpoint:
GET /.netlify/functions/guest-bookings


Example output:

{
  "guestid": "G001",
  "guest_name": "Geethika",
  "guest_email": "geethika@example.com",
  "bookingid": null
}


# 📘 Lecture 9 – Performance & Database Objects

Lecture 9 focuses on optimizing the existing full-stack application using
**indexes**, **views**, and **performance analysis tools**.

## ✅ Indexes Created

To improve JOIN, search, and filter performance, the following indexes
were created in Neon PostgreSQL:

```sql
CREATE INDEX IF NOT EXISTS idx_bookings_guestid ON bookings(guestid);
CREATE INDEX IF NOT EXISTS idx_bookings_roomid ON bookings(roomid);
CREATE INDEX IF NOT EXISTS idx_rooms_roomtype ON rooms(roomtype);
CREATE INDEX IF NOT EXISTS idx_guests_name ON guests(name);




✅ Views Created for Complex Queries

Two database views were created to simplify and optimize frequently-used
multi-table queries:

CREATE OR REPLACE VIEW guest_booking_view AS
SELECT
  b.bookingid,
  g.guestid,
  g.name AS guest_name,
  g.email AS guest_email,
  r.roomid,
  r.roomtype,
  r.pricepernight,
  b.checkindate,
  b.checkoutdate,
  b.totalcost
FROM bookings b
JOIN guests g ON b.guestid = g.guestid
JOIN rooms r ON b.roomid = r.roomid;

CREATE OR REPLACE VIEW room_status_view AS
SELECT
  r.roomid,
  r.roomtype,
  r.pricepernight,
  r.availabilitystatus
FROM rooms r;


guest_booking_view matches the JOIN-based API used to show booking
details, while room_status_view summarizes current room availability.

✅ EXPLAIN ANALYZE & Performance Notes

Using EXPLAIN ANALYZE in Neon on key queries such as:

The JOIN query behind guest_booking_view

The room type analytics query (room-type-analytics)

helped verify that:

Index scans are used on join and filter columns

Execution time remains low even as data grows

Example command:

EXPLAIN ANALYZE
SELECT
  b.bookingid,
  g.name AS guest_name,
  r.roomtype,
  b.checkindate,
  b.checkoutdate,
  b.totalcost
FROM bookings b
JOIN guests g ON b.guestid = g.guestid
JOIN rooms r ON b.roomid = r.roomid;
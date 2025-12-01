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
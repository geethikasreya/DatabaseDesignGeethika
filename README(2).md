# 🏨 Hotel Management System API

## 🎯 Project Overview
This project implements a full-stack application demonstrating **CRUD (Create, Read, Update, Delete)** operations for a hotel management system. The application serves as a bridge between a simple HTML/JavaScript frontend and a secure PostgreSQL database hosted on Neon.

### Core Objectives Achieved
* **Database Migration:** All necessary tables (`Guests`, `Rooms`, `Bookings`) and sample data have been successfully migrated to the Neon PostgreSQL service.
* **Full CRUD API:** Implemented all required `GET`, `POST`, `PUT`, and `DELETE` endpoints for managing data.
* **Deployment:** The entire application (frontend and serverless API) is live and functional on Netlify.

---

## 🔗 Live Application and Repository Links

| Item | Status/Link |
| :--- | :--- |
| **Live Netlify URL** | https://hotelmanagementbooking.netlify.app/
| **GitHub Repository**| https://github.com/geethikasreya/DatabaseDesignGeethika 

---

## 💻 Technology Stack

* **Frontend:** HTML5, CSS, JavaScript (using `fetch()` for API interaction).
* **Serverless Functions (API):** Netlify Functions (Node.js / ES Modules **.mjs**).
* **Database:** Neon (PostgreSQL).
* **Database Driver:** `@neondatabase/serverless`.

---

## 💡 API Endpoints and Usage Instructions

The following endpoints are accessible via the Netlify functions gateway (`/.netlify/functions/`) and cover all required homework deliverables, including the full CRUD cycle and advanced GET endpoints.

| Method | Endpoint | Description | Homework Requirement |
| :--- | :--- | :--- | :--- |
| **GET** | `/get-guests` | Retrieves the full list of all guest records. | **List Endpoint (Done)** |
| **GET** | `/get-guest-by-id` | Retrieves a **single** guest record by passing the `guestid`. | **Get by ID** |
| **GET** | `/search-guests` | Searches for guests by name using the `name` query parameter (e.g., using SQL `ILIKE`). | **Search/Filter** |
| **POST** | `/add-guest` | **Creates** a new guest record. Requires JSON data (name, phone, email) in the request body. | **At least 1 POST** |
| **PUT** | `/update-guest` | **Updates** an existing guest's information (e.g., phone or email) based on their ID. | **At least 1 PUT** |
| **DELETE** | `/delete-guest` | **Deletes** a guest record based on the `guestid` passed in the request. | **At least 1 DELETE** |

---

## 🛠️ Local Development Setup

To test the application and API locally:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/geethikasreya/DatabaseDesignGeethika.git](https://github.com/geethikasreya/DatabaseDesignGeethika.git)
    cd DatabaseDesignGeethika
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Set Environment Variables:** Ensure your `DATABASE_URL` for your Neon database is configured locally (e.g., via the Netlify CLI or a `.env` file).
4.  **Run Locally:**
    ```bash
    netlify dev
    ```
    The application will be accessible at `http://localhost:8888`.
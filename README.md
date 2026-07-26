# ☕ Premium Café Website (Full-Stack Application)

## 🚀 Live Demo & Deployment
- **Live URL:** [https://aura-premium-cafe.vercel.app/](https://aura-premium-cafe.vercel.app/)

A full-stack, production-ready web application designed for a luxury café business. Features an opulent customer-facing website and an administrative dashboard for managing reservations, menu items, upcoming events, and customer inquiries.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS (Custom Dark Espresso & Warm Gold Palette)
- **Icons & Animations:** Lucide Icons, Framer Motion
- **Data Visualization:** Recharts
- **Routing:** React Router DOM (v6+)
- **Notifications:** React Hot Toast
- **API Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs password hashing
- **File Storage:** Multer (Local static file uploads) & Base64/URL support
- **Validation & Security:** Express Validator, CORS, dotenv

---

## 📁 Monorepo Project Structure

```
premium-cafe/
├── client/                      # React Frontend (Vite)
│   ├── public/                  # Public assets
│   ├── src/
│   │   ├── admin/              # Admin pages & layout
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── ManageEnquiries.jsx
│   │   │   ├── ManageEvents.jsx
│   │   │   ├── ManageMenu.jsx
│   │   │   └── ManageReservations.jsx
│   │   ├── components/         # Shared UI components
│   │   │   ├── EventCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MenuCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ReservationForm.jsx
│   │   ├── context/            # AuthContext provider
│   │   │   └── AuthContext.jsx
│   │   ├── pages/              # Customer-facing pages
│   │   │   ├── About.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── MyReservations.jsx
│   │   │   └── Reservation.jsx
│   │   ├── services/           # Axios API instance & helpers
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                      # Node.js Express Backend
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── enquiryController.js
│   │   ├── eventController.js
│   │   ├── menuController.js
│   │   └── reservationController.js
│   ├── middleware/
│   │   ├── auth.js             # Verify JWT & Admin Role
│   │   ├── errorHandler.js     # Centralized error handler
│   │   └── upload.js           # Multer file upload configuration
│   ├── models/                 # Mongoose schemas
│   │   ├── Enquiry.js
│   │   ├── Event.js
│   │   ├── MenuItem.js
│   │   ├── Reservation.js
│   │   └── User.js
│   ├── routes/                 # Express API Routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── enquiryRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── menuRoutes.js
│   │   └── reservationRoutes.js
│   ├── uploads/                # Static uploaded images
│   ├── package.json
│   ├── seed.js                 # Seed script for initial DB data
│   └── server.js               # Server entry point
├── docs/                        # Project Documentation
│   ├── api.md
│   └── schema.md
├── .env.example                 # Root environment variables sample
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local MongoDB instance running at `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string.

### 1. Clone & Set Environment Variables
Copy `.env.example` files to `.env` in `server/` and `client/`:

**`server/.env`**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/premium-cafe
JWT_SECRET=super_secret_premium_cafe_jwt_key_2026
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**`client/.env`**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### 2. Backend Setup & Seed Data

```bash
cd server
npm install
npm run seed     # Populates DB with default Admin, customer, menu items, & events
npm run dev      # Starts Express server on http://localhost:5000
```

#### Pre-seeded Credentials:
- **Admin Account:** `admin@premiumcafe.com` | Password: `adminpassword123`
- **Customer Account:** `john@example.com` | Password: `customerpassword123`

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev      # Starts React Vite app on http://localhost:5173
```

---

## 🔑 Core Application Features

### 🌟 Customer Website
- **Hero & Landing Page:** Interactive showcase, chef specialties, testimonials, reservation CTA.
- **Categorized Digital Menu:** Filterable tabs (Beverages, Starters, Mains, Desserts), search input, veg/non-veg flags, availability indicators.
- **Table Reservation System:** Real-time form with date/time selection, guest counts, special requests, and instant database storage.
- **Customer Portal:** View personal reservation history and real-time status updates (`pending`, `confirmed`, `cancelled`, `completed`).
- **Events & Offers:** Showcase for live jazz nights, wine tasting, and seasonal promotions.
- **Contact & Location:** Embedded map widget, café working hours, social links, and contact enquiry form.
- **Authentication:** JWT login and registration modal/page with persistent sessions.

### 🛡️ Admin Dashboard (`role: admin`)
- **Analytics Overview:** Visual metrics with Recharts (Reservation trends, category distribution, total revenue estimate, total enquiries).
- **Menu Management:** Full CRUD (Add, Edit, Delete, Toggle Availability, Upload Image).
- **Reservation Control:** Filter by status and date, change reservation state (`confirm`, `reject`, `complete`, `cancel`).
- **Event Manager:** Create, update, or remove promotional banners and scheduled events.
- **Enquiries Viewer:** Review user feedback/messages, toggle read/resolved status.

---

## 📜 Documentation
- [Database Schema Documentation](file:///c:/Users/user/OneDrive/Desktop/Premium%20Cafe/docs/schema.md)
- [REST API Documentation](file:///c:/Users/user/OneDrive/Desktop/Premium%20Cafe/docs/api.md)

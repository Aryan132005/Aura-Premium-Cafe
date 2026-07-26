# 📡 REST API Documentation

Base URL: `http://localhost:5000/api`

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Registers a new customer account.
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword123",
    "phone": "+1 (555) 019-2834"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "token": "jwt_token_string_here",
    "user": {
      "id": "64f1...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "customer"
    }
  }
  ```

### `POST /api/auth/login`
Authenticates a user/admin and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "admin@premiumcafe.com",
    "password": "adminpassword123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "token": "jwt_token_string_here",
    "user": {
      "id": "64f1...",
      "name": "Admin User",
      "email": "admin@premiumcafe.com",
      "role": "admin"
    }
  }
  ```

### `GET /api/auth/me`
Retrieves current authenticated user profile.
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** User object.

---

## 2. Digital Menu Endpoints (`/api/menu`)

### `GET /api/menu`
Retrieves menu items. Accepts optional query filters: `category`, `search`, `isVeg`, `isAvailable`.
- **Response (200 OK):** Array of `MenuItem` objects.

### `GET /api/menu/:id`
Retrieves a single menu item by ID.

### `POST /api/menu` *(Admin Only)*
Creates a new menu item. Supports `multipart/form-data` with image file or JSON body.

### `PUT /api/menu/:id` *(Admin Only)*
Updates an existing menu item.

### `DELETE /api/menu/:id` *(Admin Only)*
Deletes a menu item.

---

## 3. Reservation Endpoints (`/api/reservations`)

### `POST /api/reservations`
Creates a table reservation. Open to guests or logged-in users.
- **Request Body:**
  ```json
  {
    "name": "Alex Smith",
    "email": "alex@example.com",
    "phone": "+1 555-4321",
    "date": "2026-08-10",
    "time": "19:30",
    "guests": 4,
    "specialRequest": "Window table preferred."
  }
  ```

### `GET /api/reservations/my` *(Auth Required)*
Retrieves reservations created by the authenticated user.

### `GET /api/reservations` *(Admin Only)*
Retrieves all reservations with optional query params `date`, `status`.

### `PUT /api/reservations/:id/status` *(Admin Only)*
Updates status (`pending`, `confirmed`, `cancelled`, `completed`).

### `DELETE /api/reservations/:id` *(Admin Only)*
Deletes a reservation record.

---

## 4. Events & Offers Endpoints (`/api/events`)

### `GET /api/events`
Lists active café events.

### `POST /api/events` *(Admin Only)*
Creates a new event with image banner.

### `PUT /api/events/:id` *(Admin Only)*
Updates an event.

### `DELETE /api/events/:id` *(Admin Only)*
Deletes an event.

---

## 5. Contact Enquiries (`/api/enquiries`)

### `POST /api/enquiries`
Submits a contact form message.

### `GET /api/enquiries` *(Admin Only)*
Lists all enquiries.

### `PUT /api/enquiries/:id` *(Admin Only)*
Updates enquiry status (`unread`, `read`, `resolved`).

---

## 6. Admin Analytics (`/api/admin`)

### `GET /api/admin/dashboard-stats` *(Admin Only)*
Returns aggregated stats: total reservations, pending enquiries, upcoming events, total menu items, monthly reservation distribution, and popular menu items breakdown.

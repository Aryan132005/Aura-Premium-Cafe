# 🗄️ Database Schemas (MySQL / Sequelize ORM)

The application uses MySQL managed via Sequelize ORM to model five relational tables: `users`, `menu_items`, `reservations`, `events`, and `enquiries`.

---

## 1. `users` Table

Stores user credentials, contact information, and role authorization.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Hashed via bcryptjs
  role ENUM('customer', 'admin') DEFAULT 'customer',
  phone VARCHAR(255) DEFAULT '',
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

---

## 2. `menu_items` Table

Contains food and beverage menu items.

```sql
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category ENUM('Beverages', 'Starters', 'Main Course', 'Desserts') NOT NULL,
  image VARCHAR(500) NOT NULL,
  isAvailable BOOLEAN DEFAULT TRUE,
  isVeg BOOLEAN DEFAULT TRUE,
  isFeatured BOOLEAN DEFAULT FALSE,
  rating FLOAT DEFAULT 4.8,
  prepTime VARCHAR(255) DEFAULT '15-20 mins',
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

---

## 3. `reservations` Table

Manages customer table bookings.

```sql
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NULL, -- Foreign key reference to users.id
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL, -- YYYY-MM-DD
  time VARCHAR(255) NOT NULL, -- HH:mm
  guests INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  specialRequest TEXT DEFAULT '',
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

---

## 4. `events` Table

Stores promotional banners, live acoustic jazz nights, and barista masterclasses.

```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date VARCHAR(255) NOT NULL,
  time VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  isActive BOOLEAN DEFAULT TRUE,
  location VARCHAR(255) DEFAULT 'Main Dining Lounge & Terrace',
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

---

## 5. `enquiries` Table

Stores customer contact submissions.

```sql
CREATE TABLE enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  status ENUM('unread', 'read', 'resolved') DEFAULT 'unread',
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

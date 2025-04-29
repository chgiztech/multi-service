# 🗂️ Multi-Service API for User, Record, Email & Authentication

This project includes multiple services that provide user management, note (record) handling, email sending via RabbitMQ, and authentication functionality.

---

## 🚀 Features

- **Email Service**
  Sends welcome emails to users via RabbitMQ and Nodemailer. A welcome email is triggered when a user successfully registers.

- **Record Service**
  Full CRUD operations for managing personal notes (records). Supports creating, reading, updating, and deleting records in the database.

- **User Service**
  Handles user account operations including create, read, update, and delete. Manages the user database and profile information.

- **Auth Service**
  Handles user registration and authentication using **JWT (JSON Web Tokens)**. Supports token creation, validation, and dispatching welcome messages on registration.

---

## 🧩 Technologies Used

- **Node.js** – Core service logic is implemented using Node.js
- **Sequelize** – ORM used for PostgreSQL database interactions
- **RabbitMQ** – Enables asynchronous messaging between microservices
- **Nodemailer** – Sends transactional/welcome emails
- **JWT (JSON Web Tokens)** – Used for secure authentication and session management
- **PostgreSQL** – Relational database for storing users and records

---

## 🚀 Running the Servers

To start the servers in development mode:

```bash
npm run dev
```
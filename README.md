# User Management & Authentication/Authorization REST API

A production-ready backend REST API built using **Node.js, Express.js, MongoDB, and Mongoose**. This project demonstrates secure user authentication, JWT-based authorization, role-based access control, request validation, security hardening, automated admin seeding, and token invalidation on password change.

- **Live Production API**: [https://node-js-user-management-api.onrender.com](https://node-js-user-management-api.onrender.com)
- **GitHub Repository**: [Vishal-Maht0/node.js-user-management-api](https://github.com/Vishal-Maht0/node.js-user-management-api)

---

## 🚀 Features

- **User Authentication**: Secure registration and login endpoints.
- **Password Hashing**: Passwords stored securely using `bcrypt`.
- **JWT Authorization**: Token-based authentication using Bearer headers.
- **Token Invalidation**: Instant JWT invalidation across sessions after a password change via `tokenVersion`.
- **Role-Based Authorization**: Restricted admin-only routes (e.g., fetch all users).
- **Ownership Authorization**: Strict checks to ensure normal users can only access or modify their own profile data.
- **Request Validation**: Schema-based payload validation using `Joi` (whitelisting permitted fields, preventing empty update payloads, and stripping unknown fields).
- **Security Hardening**: Secure HTTP headers via `Helmet` and IP rate limiting on authentication routes via `express-rate-limit`.
- **Automated Admin Seeding**: Script-driven admin user provisioning for fresh deployment environments without manual DB intervention.
- **Centralized Error Handling**: Unified application error handling using a custom `AppError` class.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js (v22+)** | JavaScript runtime environment |
| **Express.js (v5)** | Web framework for Node.js |
| **MongoDB & Mongoose** | NoSQL database & ODM |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **Bcrypt** | Password hashing & verification |
| **Joi** | Schema-based request validation |
| **Helmet** | HTTP security headers |
| **Express Rate Limit** | Brute-force & rate-limiting protection |
| **Dotenv** | Environment variable management |
| **Render & MongoDB Atlas** | Cloud hosting & cloud database |

---

## 📁 Project Structure

```text
node.js-user-management-api/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
├── errors/
│   └── AppError.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validations/
│       ├── auth.validation.js
│       └── user.validation.js
├── models/
│   ├── user.model.js
│   └── user.schema.js
├── routes/
│   ├── auth.route.js
│   └── user.route.js
├── scripts/
│   └── seedAdmin.js
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
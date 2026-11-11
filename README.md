# User Management & Authentication/Authorization REST API

A secure backend REST API built with **Node.js, Express.js, MongoDB, and Mongoose**, deployed on Render with MongoDB Atlas. It demonstrates JWT authentication, role-based and ownership-based authorization, request validation, security hardening, automated admin seeding, and token invalidation on password change.

- **Live API**: [https://node-js-user-management-api.onrender.com](https://node-js-user-management-api.onrender.com)
- **GitHub Repository**: [Vishal-Maht0/node.js-user-management-api](https://github.com/Vishal-Maht0/node.js-user-management-api)

> **Note:** The live API runs on Render's free tier. The instance sleeps after a period of inactivity, so the **first request may take around a minute**. Later requests are fast.

---

## 🚀 Features

- **User Authentication**: Secure registration and login endpoints.
- **Password Hashing**: Passwords are stored as `bcrypt` hashes, never in plain text.
- **JWT Authorization**: Token-based authentication using Bearer headers.
- **Token Invalidation**: Old JWTs stop working after a password change, using a `tokenVersion` check.
- **Role-Based Authorization**: Admin-only routes (for example, fetching all users or deleting a user).
- **Ownership Authorization**: Normal users can only access or modify their own profile data.
- **Request Validation**: Schema-based validation with `Joi` (field whitelisting, empty update payloads rejected, unknown fields stripped).
- **Security Hardening**: Secure HTTP headers with `Helmet` and rate limiting on authentication routes with `express-rate-limit`.
- **Automated Admin Seeding**: A script creates the first admin user for fresh environments without manual database work.
- **Centralized Error Handling**: One error middleware and a custom `AppError` class for consistent error responses.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js (v22+)** | JavaScript runtime |
| **Express.js (v5)** | Web framework |
| **MongoDB & Mongoose** | NoSQL database and ODM |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **bcrypt** | Password hashing and verification |
| **Joi** | Request validation |
| **Helmet** | HTTP security headers |
| **express-rate-limit** | Brute-force and rate-limiting protection |
| **dotenv** | Environment variable management |
| **Render & MongoDB Atlas** | Cloud hosting and cloud database |
| **Postman** | API testing |

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
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js v22 or higher
- MongoDB (local installation or a MongoDB Atlas cluster)

### Installation

```bash
git clone https://github.com/Vishal-Maht0/node.js-user-management-api.git
cd node.js-user-management-api
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and add your own values. **Never commit `.env` to GitHub.**

| Variable | Description |
|---|---|
| `PORT` | Server port (defaults to 5000) |
| `MONGODB_URL` | MongoDB connection string |
| `JWT_SECRET` | Long random secret used to sign JWTs |
| `SEED_ADMIN_NAME` | Name of the admin created by the seed script |
| `SEED_ADMIN_EMAIL` | Email of the admin created by the seed script |
| `SEED_ADMIN_PASSWORD` | Password of the admin (minimum 8 characters) |

### Run the Server

```bash
npm run dev    # development (nodemon)
npm start      # production
```

### Create the First Admin

Registration creates normal users. To create the first admin, set the `SEED_ADMIN_*` variables in `.env` and run:

```bash
node scripts/seedAdmin.js
```

The script hashes the password with bcrypt and refuses to run if an admin already exists or if the email is already registered. To seed a deployed database, run the script locally with `MONGODB_URL` pointing to that database.

---

## 📡 API Endpoints

Base URL: `https://node-js-user-management-api.onrender.com`

### Auth Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in and receive a JWT |
| PATCH | `/api/auth/change-password` | Logged-in user | Change password (old tokens become invalid) |

### User Routes (`/api/users`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users` | Admin only | Get all users |
| GET | `/api/users/:id` | Owner or admin | Get one user by ID |
| PATCH | `/api/users/:id` | Owner or admin | Update allowed fields of a user |
| DELETE | `/api/users/:id` | Admin only | Delete a user |

### Example Requests

**Register**

```bash
curl -X POST https://node-js-user-management-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "Test@12345"}'
```

**Login**

```bash
curl -X POST https://node-js-user-management-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Test@12345"}'
```

The response contains a JWT. Send it in the `Authorization` header on protected routes:

```bash
curl https://node-js-user-management-api.onrender.com/api/users/<user_id> \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## 🔐 How Authentication Works

1. The user registers, and the password is stored as a bcrypt hash.
2. On login, the password is verified with `bcrypt.compare()` and the server issues a signed JWT (expires in 1 day).
3. For protected routes, the client sends `Authorization: Bearer <token>`.
4. The auth middleware verifies the token, checks that its `tokenVersion` matches the user's current version in the database, and attaches the user details to `req.user`.
5. Role and ownership middlewares then decide whether the request is allowed.
6. When a user changes their password, `tokenVersion` increases by one, so every token issued earlier is rejected with `401`.

---

## ⚠️ Error Responses

All errors use the same JSON format:

```json
{
  "success": false,
  "message": "Error description"
}
```

| Status | Meaning |
|---|---|
| 400 | Invalid input (validation error) |
| 401 | Missing, invalid, expired, or revoked token; wrong credentials |
| 403 | Authenticated but not allowed (wrong role or not the owner) |
| 404 | Resource or route not found |
| 409 | Conflict, such as an email that is already registered |
| 429 | Too many requests (rate limit) |
| 500 | Unexpected server error (internal details are not exposed) |

---

## 🧪 Testing

The API has been tested manually with Postman, covering:

- Registration and login (valid and invalid data)
- Protected routes with a valid token, no token, and an invalid or expired token
- Role-based access (admin-only routes)
- Ownership checks (a user accessing another user's data)
- Token invalidation after a password change (old token returns `401`, new token works)

---

## 🔮 Future Improvements

- Automated tests with Vitest and Supertest
- Refresh tokens
- Pagination and filtering for list endpoints
- API documentation with Swagger/OpenAPI

---

## 👤 Author

**Vishal Mahto**

- GitHub: [Vishal-Maht0](https://github.com/Vishal-Maht0)
- LinkedIn: [vishal-mahto](https://www.linkedin.com/in/vishal-mahto-04833a322)
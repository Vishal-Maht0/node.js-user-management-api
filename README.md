# User Management & Authentication/Authorization REST API

A backend REST API built using **Node.js, Express.js, MongoDB, and Mongoose**. This project demonstrates user authentication, JWT-based authorization, secure password handling, request validation, and protected user-management operations.

**GitHub Repository:** [node.js-user-management-api](https://github.com/Vishal-Maht0/node.js-user-management-api)

## Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication using Bearer tokens
- Authentication middleware for verifying JWTs
- User details attached to `req.user` after token verification
- User CRUD operations
- Role-based authorization for admin-only operations
- Ownership checks for protected user operations
- Request validation using Joi
- Validation for partial updates and empty PATCH requests
- Field whitelisting to prevent unauthorized field updates
- Unknown-field stripping during validation
- Centralized error handling using a custom `AppError` class
- API testing using Postman

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Programming language |
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JWT | Token-based authentication |
| bcrypt | Password hashing and comparison |
| Joi | Request validation |
| dotenv | Environment variable management |
| Postman | API testing |
| Git & GitHub | Version control and project hosting |

## Project Structure

```text
node.js-user-management-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
│
├── errors/
│   └── AppError.js
│
├── middlewares/
│   ├── validations/
│   │   ├── auth.validation.js
│   │   └── user.validation.js
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── user.model.js
│   └── user.schema.js
│
├── routes/
│   ├── auth.route.js
│   └── user.route.js
│
├── app.js
├── package.json
├── package-lock.json
└── .gitignore
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Vishal-Maht0/node.js-user-management-api.git
```

### 2. Navigate to the project directory

```bash
cd node.js-user-management-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory of the project and add your own configuration:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Replace the example values with your actual local configuration. The database connection code reads `MONGODB_URL` from the environment, and JWT authentication uses `JWT_SECRET`.

**Security:** Never commit your `.env` file, database credentials, or JWT secret to GitHub.

### 5. Start the application

The application entry file is `app.js`. Run:

```bash
node app.js
```

If your `package.json` defines a start script, you can use the corresponding npm command instead.

## Authentication

The API implements token-based authentication using JSON Web Tokens (JWT).

### Registration

Users can register through the registration endpoint configured in the authentication router.

### Login

Users can log in through the login endpoint. Password verification uses bcrypt, and successful authentication can provide a JWT for subsequent protected requests.

### Accessing protected routes

For protected endpoints, include the JWT in the request header:

```http
Authorization: Bearer <your_jwt_token>
```

The authentication middleware verifies the token and attaches the authenticated user's details to `req.user`.

## Authorization

Authentication and authorization serve different purposes:

- **Authentication:** Verifies the identity of the user.
- **Authorization:** Determines whether the authenticated user is allowed to perform an operation.

This project includes role-based authorization for restricted operations and ownership checks for protected user resources.

## Request Validation and Error Handling

- Joi validates incoming request data.
- Update validation prevents empty update requests.
- Permitted fields are whitelisted to reduce the risk of mass-assignment vulnerabilities.
- Unknown fields are stripped where configured.
- A custom `AppError` class and centralized error-handling middleware help manage application errors consistently.

## API Testing

The API can be tested using **Postman**.

For protected routes:

1. Register a user and log in.
2. Obtain the JWT returned by the authentication flow.
3. Select **Authorization → Bearer Token** in Postman.
4. Enter the token and send the request.
5. Test valid requests, invalid tokens, validation errors, and unauthorized operations.

Refer to `routes/auth.route.js` and `routes/user.route.js` for the exact endpoints and HTTP methods implemented in the project.

## Future Improvements

- Add automated tests for authentication and user-management routes.
- Improve API documentation with request and response examples.
- Add deployment configuration and production environment settings.
- Add refresh-token handling and token-revocation support if required.

## Author

**Vishal Mahto**

- GitHub: [Vishal-Maht0](https://github.com/Vishal-Maht0)
- Project: [User Management & Authentication/Authorization REST API](https://github.com/Vishal-Maht0/node.js-user-management-api)

---

*Built as a backend development and portfolio project.*

# 📝 Introduction

This project is an API for a donation and help request platform. It connects people in need with potential donors willing to offer support. Users can register as either recipients, who can create help requests for items such as food, clothing, or medicine, or as donors, who can view open requests and respond with offers to help.

The API is built with Typescript Node.js, Express, and MongoDB, and it is designed to be secure, scalable, and easy to integrate with a front-end application or mobile app.

## Endpoints

### 1. Register a New User

**Endpoint:** `POST /auth/register`

**Description:** Creates a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response 201** Created

```json
{
  "id": "60f5c2b6b3f6f91a8c123456",
  "email": "john@example.com"
}
```

**Response 400** Bad Request (if email already registered)

```json
{
  "message": "Email already registered"
}
```

---

### 2. Log In

**Endpoint:** `POST /auth/login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response 200** Ok

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Unauthorized 401** (invalid credentials)

```json
{
  {
    "message": "Invalid credentials"
  }
}
```

### 3. Get Authenticated User Info

**Endpoint:** GET /auth/me

**Description:** Returns the authenticated user's details.

**Headers:**

```json
  Authorization: Bearer <JWT_TOKEN>
```

**Response 200** Ok

```json
{
  "_id": "60f5c2b6b3f6f91a8c123456",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "updatedAt": "2023-01-01T12:00:00.000Z"
}
```

**Response 401** Unauthorized (missing or invalid token)

```json
{
  "message": "Unauthorized: Token not provided"
}
```

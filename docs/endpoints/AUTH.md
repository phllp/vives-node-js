## Auth Endpoints

### 1. Register a New User

**Endpoint:** `POST /auth/register`

**Description:** Creates a new user account.

- Allowed roles
  - donor
  - recipient
- Password must be at least 8 chars long

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "donor"
}
```

**Response 201** Created

```json
{
  "id": "60f5c2b6b3f6f91a8c123456",
  "email": "john@example.com"
}
```

**Response 400** If a required field is missing

```json
{
  "status": "error",
  "message": "\"email\" is required"
}
```

**Response 400** Bad Request (if email already registered)

```json
{
  "status": "error",
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

**Response 200** Ok - Authenticated user JWT Token

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Unauthorized 401** Invalid credentials

```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

**Unauthorized 400** Missing fields

```json
{
  "status": "error",
  "message": "All fields are required"
}
```

### 3. Get Authenticated User Info

**Endpoint:** `GET /auth/me`

**Description:** Returns the authenticated user's details.

**Headers:**

```json
Authorization: Bearer <JWT_TOKEN>
```

**Response 200** Ok - User data

```json
{
  "_id": "683718599bd659580560365d",
  "name": "Father McKenzie",
  "email": "father@mckenzie.com",
  "role": "recipient",
  "createdAt": "2025-05-28T14:06:17.629Z",
  "__v": 0
}
```

**Response 401** Unauthorized (missing or invalid token)

```json
{
  "message": "Unauthorized: Invalid token"
}
```

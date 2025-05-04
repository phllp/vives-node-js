# API Endpoints

This file describes every single endpoint implemented in this API.
The .http files in this folders also provide a way to test these endpoints with ease, all that is necessary is the [Rest Client](https://marketplace.visualstudio.com/items/?itemName=humao.rest-client) extension installed in Visual Studio Code. It is important to start testing from auth.http because most of the API calls will depend on the logged user token, and you obtain that code via the login endpoint.

**Important:** Also make sure to update the environment variables contained on each .http file.

## Auth Endpoints

### 1. Register a New User

**Endpoint:** `POST /auth/register`

**Description:** Creates a new user account.

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

## Donation Endpoints

### 1. Create Donation

**Endpoint:** POST /donations

**Description:** Create a new donation.

**Headers:**

```json
  Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "title": "Winter Coat",
  "description": "A gently used men's coat",
  "category": "Clothing"
}
```

**Response 201** Created

```json
{
  "_id": "665123abc123...",
  "title": "Winter Coat",
  "description": "A gently used men's coat",
  "category": "Clothing",
  "status": "available",
  "donor": "664abc321def...",
  "createdAt": "2025-05-03T12:34:56.789Z"
}
```

### 2. Get All Donations

**Endpoint:** GET /donations

**Description:** Retrieve a list of all available donations.

**Authentication:** Optional

**Response 200** OK

```json
[
  {
    "_id": "665123abc123...",
    "title": "Winter Coat",
    "category": "Clothing",
    "status": "available"
  },
  ...
]
```

### 3. Get Donation by ID

**Endpoint:** GET /donations/:id

**Description:** Get a specific donation by its ID.

**Authentication:** Optional

**Response 200** OK

```json
{
  "_id": "665123abc123...",
  "title": "Winter Coat",
  "description": "A gently used men's coat",
  "category": "Clothing",
  "status": "available",
  "donor": "664abc321def...",
  "recipient": null,
  "createdAt": "2025-05-03T12:34:56.789Z"
}
```

**Error 404** Not Found if donation does not exist.

### 4. Update Donation

**Endpoint:** PUT /donations/:id

**Description:** Update details of a donation.

**Authentication:** Required

**Request Body:**

```json
{
  "title": "Updated Coat",
  "status": "claimed",
  "recipient": "665eeeabcde33..."
}
```

**Response 200** OK

```json
{
  "_id": "665123abc123...",
  "title": "Updated Coat",
  "status": "claimed",
  "recipient": "665eeeabcde33..."
}
```

**Error 400:** Bad Request for invalid ID or payload

### 5. Delete Donation

**Endpoint:** DELETE /donations/:id

**Description:** Delete a donation (only by its donor).

**Authentication:** Required

**Response 204** No Content

**Error 404:** Donation not found

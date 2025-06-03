## Donation Endpoints

### 1. Create Donation

**Endpoint:** `POST /donations`

**Description:** Create a new donation.

**Headers:**

```json
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "title": "Winter Jacket",
  "message": "Hope this helps someone stay warm this winter!",
  "category": "clothing",
  "helpRequest": "help_request_id"
}
```

**Response 201** Created

```json
{
  "title": "Winter Jacket",
  "category": "clothing",
  "message": "Hope this helps someone stay warm this winter!",
  "donor": "6837180e9bd6595805603659",
  "helpRequest": "68383d01c8bdd3ae36b8a354",
  "_id": "683c1f06dd8f45bbaa32a692",
  "createdAt": "2025-06-01T09:36:06.018Z",
  "updatedAt": "2025-06-01T09:36:06.018Z",
  "__v": 0
}
```

**Response 400** Help Request already fulfilled

```json
{
  "status": "error",
  "message": "This help request has already been fulfilled"
}
```

**Response 400** Category mismatch (and invalid options)

```json
{
  "status": "error",
  "message": "The category of the help request does not match the donation category"
}
```

**Response 404** Help Request not Found

```json
{
  "status": "error",
  "message": "Help request not found"
}
```

**Response 400** User role invalid

```json
{
  "status": "error",
  "message": "Only Donors can create Donations"
}
```

**Response 400** Missing params

```json
{
  "status": "error",
  "message": "\"category\" is required"
}
```

**Response 401** Unauthorized

```json
{
  "message": "Unauthorized: Invalid token"
}
```

### 2. Get All Donations

**Endpoint:** `GET /donations`

**Description:** Retrieve a list of all donations.

**Authentication:** Optional

**Response 200** OK

```json
[
  {
    "_id": "683c237d6ade47cb569767a3",
    "title": "Winter Jacket",
    "category": "clothing",
    "message": "Hope this helps someone stay warm this winter!",
    "donor": {
      "_id": "6837180e9bd6595805603659",
      "name": "Eleanor Rigby",
      "email": "eleanor@rigby.com"
    },
    "helpRequest": "68383d01c8bdd3ae36b8a354",
    "createdAt": "2025-06-01T09:55:09.473Z",
    "updatedAt": "2025-06-01T09:55:09.473Z",
    "__v": 0
  },
  {...},
  {...}
]
```

### 3. Get Donation by ID

**Endpoint:** `GET /donations/:id`

**Description:** Get a specific donation by it's ID.

**Authentication:** Optional

**Response 200** OK

```json
{
  "_id": "683c237d6ade47cb569767a3",
  "title": "Winter Jacket",
  "category": "clothing",
  "message": "Hope this helps someone stay warm this winter!",
  "donor": {
    "_id": "6837180e9bd6595805603659",
    "name": "Eleanor Rigby",
    "email": "eleanor@rigby.com"
  },
  "helpRequest": "68383d01c8bdd3ae36b8a354",
  "createdAt": "2025-06-01T09:55:09.473Z",
  "updatedAt": "2025-06-01T09:55:09.473Z",
  "__v": 0
}
```

**Error 404** Not Found if donation does not exist.

```json
{
  "status": "error",
  "message": "Donation not found"
}
```

### 4. Update Donation

**Endpoint:** `PUT /donations/:id`

**Description:** Update details of a donation.

**Authentication:** Required

**Request Body:**

```json
{
  "title": "Winter Jacket (Updated)",
  "description": "Still gently used, added hood",
  "category": "clothing"
}
```

**Response 200** OK

```json
{
  "_id": "683c237d6ade47cb569767a3",
  "title": "Winter Jacket (Updated)",
  "category": "clothing",
  "message": "Hope this helps someone stay warm this winter!",
  "donor": "6837180e9bd6595805603659",
  "helpRequest": "68383d01c8bdd3ae36b8a354",
  "createdAt": "2025-06-01T09:55:09.473Z",
  "updatedAt": "2025-06-01T10:10:19.051Z",
  "__v": 0
}
```

**Response 404** Not Found if donation does not exist.

```json
{
  "error": "Donation not found"
}
```

**Response 403**

```json
{
  "status": "error",
  "message": "You can only update your own donations"
}
```

**Response 400:** Bad Request for invalid ID or payload

### 5. Delete Donation

**Endpoint:** `DELETE /donations/:id`

**Description:** Delete a donation (only by its donor).

**Authentication:** Required

**Response 204** No Content

**Response 404** Not Found if donation does not exist.

```json
{
  "error": "Donation not found"
}
```

**Response 403** Unauthorized.

```json
{
  "status": "error",
  "message": "You can only delete your own donations"
}
```

### 6. Donations Analytics

**Endpoint** `GET /donations/analytics/overview`

**Description:** Retrieve general statistics about the donations.

**Authentication:** Optional

**Response 200**

```json
  "totalDonations": 0,
  "totalHelpRequests": 3,
  "openHelpRequests": 3,
  "fulfilledHelpRequests": 0
```

### 7. My Donations

**Endpoint** `/donations/my`

**Description:** Retrive all donations created by the authenticated user

**Authentication:** Required

**Response 200**

```json
[
  {
    "_id": "683c2ec8d0455b359176a743",
    "title": "Winter Jacket",
    "category": "clothing",
    "message": "Hope this helps someone stay warm this winter!",
    "donor": {
      "_id": "6837180e9bd6595805603659",
      "name": "Eleanor Rigby",
      "email": "eleanor@rigby.com"
    },
    "helpRequest": "68383d01c8bdd3ae36b8a354",
    "createdAt": "2025-06-01T10:43:20.039Z",
    "updatedAt": "2025-06-01T10:43:20.039Z",
    "__v": 0
  }
]
```

**Response 401** Unauthorized

```json
{
  "message": "Unauthorized: Token not provided"
}
```

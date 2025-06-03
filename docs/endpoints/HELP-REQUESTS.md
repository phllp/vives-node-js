## Help Request Endpoints

### 1. Create Help Request

**Endpoint:** `POST /help-requests`

**Description:** Create a new help request.

- Allowed categories:
  - clothing
  - food
  - health
  - other

**Headers:**

```json
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "title": "Need clothes for winter",
  "description": "I am looking for warm clothes for my kids.",
  "category": "clothing"
}
```

**Response 201** Created

```json
{
  "_id": "68383b92c8bdd3ae36b8a351",
  "title": "Need clothes for winter",
  "description": "I am looking for warm clothes for my kids.",
  "category": "clothing",
  "requester": "683718599bd659580560365d",
  "status": "open",
  "createdAt": "2025-05-29T10:48:50.054Z",
  "__v": 0
}
```

**Response 400** Bad request - Category doesn't exist

```json
{
  "status": "error",
  "message": "\"category\" must be one of [food, clothing, health, other]"
}
```

**Response 400** Bad request - Required field missing

```json
{
  "status": "error",
  "message": "\"title\" is required"
}
```

**Response 400** Bad request - User role not alowed

```json
{
  "status": "error",
  "message": "Only recipients can create help requests"
}
```

### 2. Get all Help Requests

**Endpoint:** `GET /help-requests`

**Description:** Retrieve a list of all existing Help Requests.

**Authentication:** Optional

**Response 200** OK - Array of objects

```json
[
  {
    "_id": "68383b92c8bdd3ae36b8a351",
    "title": "Need clothes for winter",
    "description": "I am looking for warm clothes for my kids.",
    "category": "clothing",
    "requester": "683718599bd659580560365d",
    "status": "open",
    "createdAt": "2025-05-29T10:48:50.054Z",
    "__v": 0
  },
  {...},
  {...}
]
```

### 3. Get Help Request by ID

**Endpoint:** `GET /help-requests/:id`

**Description:** Get a specific Help Request by its ID.

**Authentication:** Optional

**Response 200** OK

```json
{
  "_id": "68383b92c8bdd3ae36b8a351",
  "title": "Need clothes for winter",
  "description": "I am looking for warm clothes for my kids.",
  "category": "clothing",
  "requester": {
    "_id": "683718599bd659580560365d",
    "name": "Father McKenzie"
  },
  "status": "open",
  "createdAt": "2025-05-29T10:48:50.054Z",
  "__v": 0
}
```

**Response 404** Not found

```json
{
  "status": "error",
  "message": "Help Request not found"
}
```

### 4. Update Help Request

**Endpoint:** `PUT /help-requests/:id`

**Description:** Update details of a Help Request.

**Authentication:** Required

**Request Body:**

```json
{
  "title": "Need warmer winter jackets",
  "description": "Preferably for ages 0-5."
}
```

**Response 200** OK

```json
{
  "_id": "68384207552c54e1cfe3d317",
  "title": "Need warmer winter jackets",
  "description": "Preferably for ages 0-5.",
  "category": "clothing",
  "requester": "683718599bd659580560365d",
  "status": "open",
  "createdAt": "2025-05-29T11:16:23.390Z",
  "__v": 0
}
```

**Response 404** Not found

```json
{
  "status": "error",
  "message": "Help Request not found"
}
```

**Response 400** User can't update other user request

```json
{
  "status": "error",
  "message": "You can only update your own help requests"
}
```

### 5. Delete Help Request

**Endpoint:** `DELETE /help-requests/:id`

**Description:** Delete a Help Request (only by its creator).

**Authentication:** Required

**Response 204** No Content

**Error 400:** Can't delete fulfilled Request

```json
{
  "status": "error",
  "message": "Cannot delete a fulfilled help request"
}
```

**Error 403** Can't delete other user Request

```json
{
  "status": "error",
  "message": "You can only delete your own help requests"
}
```

### 6. Get Open Help Requests

**Endpoint:** `GET /help-requests/open`

**Description:** Retrieve all the Help Requests that are not fulfilled (open).

**Authentication:** Optional

**Response 200** OK

```json
[
  {
    "_id": "6838419e552c54e1cfe3d313",
    "title": "Need clothes for winter",
    "description": "I am looking for warm clothes for my kids.",
    "category": "clothing",
    "requester": {
      "_id": "683718599bd659580560365d",
      "name": "Father McKenzie"
    },
    "status": "open",
    "createdAt": "2025-05-29T11:14:38.904Z",
    "__v": 0
  },
  {...},
  {...}
]
```

### 7. Get Authenticated user Help Requests

**Endpoint:** `GET /help-requests/my`

**Description:** Retrieve all the Help Requests opened by the authenticated user.

**Authentication:** Required

**Response 200** OK

```json
[
  {
    "_id": "6838419e552c54e1cfe3d313",
    "title": "Need clothes for winter",
    "description": "I am looking for warm clothes for my kids.",
    "category": "clothing",
    "requester": {
      "_id": "683718599bd659580560365d",
      "name": "Father McKenzie"
    },
    "status": "open",
    "createdAt": "2025-05-29T11:14:38.904Z",
    "__v": 0
  },
  {...},
  {...}
]
```

**Response 401** Unauthorized

```json
{
  "message": "Unauthorized: Invalid token"
}
```

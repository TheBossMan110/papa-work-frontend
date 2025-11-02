# Inventory Management System - API Documentation

## Base URL
\`\`\`
http://localhost:8000
\`\`\`

## Authentication

All endpoints (except `/api/auth/login` and `/api/health`) require a JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints

### Authentication

#### Login
\`\`\`
POST /api/auth/login
\`\`\`

**Request Body:**
\`\`\`json
{
  "username": "admin",
  "password": "admin123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "Admin"
  }
}
\`\`\`

---

### Dashboard

#### Get Dashboard Metrics
\`\`\`
GET /api/dashboard/metrics
\`\`\`

**Response:**
\`\`\`json
{
  "total_items": 2450,
  "low_stock_count": 23,
  "total_locations": 8,
  "total_printers": 45
}
\`\`\`

---

### Inventory Items

#### Get All Inventory Items
\`\`\`
GET /api/inventory
\`\`\`

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "name": "Toner Cartridge Black",
    "sku": "TCB-001",
    "quantity": 150,
    "min_stock": 50,
    "location_id": 1,
    "status": "In Stock"
  }
]
\`\`\`

#### Create Inventory Item
\`\`\`
POST /api/inventory
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "Toner Cartridge Black",
  "sku": "TCB-001",
  "quantity": 150,
  "min_stock": 50,
  "location_id": 1
}
\`\`\`

**Response:** (Same as item object above)

#### Update Inventory Item
\`\`\`
PUT /api/inventory/{item_id}
\`\`\`

**Request Body:** (Same as create)

**Response:** (Updated item object)

#### Delete Inventory Item
\`\`\`
DELETE /api/inventory/{item_id}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Item deleted successfully"
}
\`\`\`

---

### Locations

#### Get All Locations
\`\`\`
GET /api/locations
\`\`\`

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "name": "Main Store",
    "address": "123 Business St",
    "items": 450,
    "printers": 15
  }
]
\`\`\`

#### Create Location
\`\`\`
POST /api/locations
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "Main Store",
  "address": "123 Business St"
}
\`\`\`

**Response:** (Location object)

---

### Printers

#### Get All Printers
\`\`\`
GET /api/printers
\`\`\`

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "model": "HP LaserJet Pro",
    "location_id": 1,
    "status": "Active",
    "supplies": "Toner, Paper"
  }
]
\`\`\`

#### Create Printer
\`\`\`
POST /api/printers
\`\`\`

**Request Body:**
\`\`\`json
{
  "model": "HP LaserJet Pro",
  "location_id": 1,
  "status": "Active",
  "supplies": "Toner, Paper"
}
\`\`\`

**Response:** (Printer object)

#### Update Printer
\`\`\`
PUT /api/printers/{printer_id}
\`\`\`

**Request Body:** (Same as create)

**Response:** (Updated printer object)

---

### Stock Movements

#### Record Stock Movement
\`\`\`
POST /api/stock-movements
\`\`\`

**Request Body:**
\`\`\`json
{
  "item_id": 1,
  "movement_type": "in",
  "quantity": 50,
  "notes": "Restocking"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Stock movement recorded successfully"
}
\`\`\`

---

### Reports

#### Get Stock Consumption Report
\`\`\`
GET /api/reports/stock-consumption
\`\`\`

**Response:**
\`\`\`json
[
  {
    "date": "2024-01-15",
    "movements": 5,
    "total_consumed": 120
  }
]
\`\`\`

#### Get Low Stock Report
\`\`\`
GET /api/reports/low-stock
\`\`\`

**Response:**
\`\`\`json
[
  {
    "id": 2,
    "name": "Toner Cartridge Color",
    "sku": "TCC-001",
    "quantity": 45,
    "min_stock": 50,
    "location": "Branch A"
  }
]
\`\`\`

---

### Health Check

#### Health Check
\`\`\`
GET /api/health
\`\`\`

**Response:**
\`\`\`json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000000"
}
\`\`\`

---

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "detail": "Invalid request data"
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "detail": "Invalid credentials"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "detail": "Item not found"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "detail": "Internal server error"
}
\`\`\`

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Authentication required |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Interactive Documentation

Access the interactive API documentation at:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## Example Usage

### Using cURL

\`\`\`bash
# Login
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get inventory (with token)
curl -X GET "http://localhost:8000/api/inventory" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Create inventory item
curl -X POST "http://localhost:8000/api/inventory" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Item",
    "sku": "NEW-001",
    "quantity": 100,
    "min_stock": 20,
    "location_id": 1
  }'
\`\`\`

### Using JavaScript/Fetch

\`\`\`javascript
// Login
const loginResponse = await fetch('http://localhost:8000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' })
});

const { access_token } = await loginResponse.json();

// Get inventory
const inventoryResponse = await fetch('http://localhost:8000/api/inventory', {
  headers: { 'Authorization': `Bearer ${access_token}` }
});

const inventory = await inventoryResponse.json();
console.log(inventory);
\`\`\`

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production, consider adding rate limiting middleware.

---

## CORS

CORS is enabled for all origins. For production, restrict to specific domains in `backend/main.py`.

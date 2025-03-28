# Hotel Room Booking System

A simple Node.js application for managing hotel room bookings, including features to book a room, retrieve booking details, cancel a booking, and modify booking details.

## Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)

- npm (comes with Node.js)

### Installation & Setup

- Clone the repository

```
git clone https://github.com/your-username/hotel-booking-system.git
cd hotel-booking-system
```

### Install dependencies

```
npm install
```

### Start the server

```
npm start
```

The server runs on http://localhost:3000 by default.

### Run tests
```
npm test
```

cURL Commands

## 1. Book a Room
```
curl -X POST "http://localhost:3000/book-room" \
-H "Content-Type: application/json" \
-d '{"name": "Alice", "email": "alice@example.com", "checkIn": "2025-04-01", "checkOut": "2025-04-05"}'
```

## 2. View Booking Details
```
curl -X GET "http://localhost:3000/booking-details?email=alice@example.com"
```

## 3. View all Guests
```
curl -X GET "http://localhost:3000/all-guests"
```

## 4. Cancel Room Booking
```
curl -X DELETE "http://localhost:3000/cancel-booking" \
-H "Content-Type: application/json" \
-d '{"email": "alice@example.com"}'
```

## 5. Modify Booking
```
curl -X PUT "http://localhost:3000/modify-booking" \
-H "Content-Type: application/json" \
-d '{"email": "alice@example.com", "checkIn": "2025-04-02", "checkOut": "2025-04-06"}'
```


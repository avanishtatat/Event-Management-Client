# Event Management Client

Frontend client for browsing events, viewing event details, logging in/signup, and accessing a user dashboard.

## Tech Stack

- React + Vite
- React Router
- Tailwind CSS
- React Toastify
- React Icons

## Features

- Authentication pages: login and signup
- Event listing with filters (search, location, category)
- Pagination UI with current page indication
- Event details page by event ID
- Dashboard route
- Navbar route label showing the current page (Home, Event Details, Dashboard, etc.)
- User menu with logout action

## Routes

- `/` - Home (event list)
- `/events/:eventId` - Event details
- `/dashboard` - Dashboard
- `/login` - Login
- `/signup` - Signup

## Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm
- Backend API running (default base URL in `.env.example` is `http://localhost:8000`)

## Environment Variables

1. Copy example env file:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Update `.env` values if needed:
   - `VITE_BASE_URL` - Backend API base URL

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open the app at the local URL shown in terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## API Notes

All requests use this base URL:

- `VITE_BASE_URL` (from `.env`)

The frontend expects JSON responses and generally checks `responseData.success`.

### 1) Signup

- **Endpoint:** `POST /api/auth/signup`
- **Auth:** Not required
- **Headers:** `Content-Type: application/json`
- **Request body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secret123"
  }
  ```

- **Frontend success handling:** shows success toast and redirects to `/login`
- **Frontend failure handling:** shows error toast with `message`

### 2) Login

- **Endpoint:** `POST /api/auth/login`
- **Auth:** Not required
- **Headers:** `Content-Type: application/json`
- **Request body:**

  ```json
  {
    "email": "john@example.com",
    "password": "secret123"
  }
  ```

- **Expected success response fields used by frontend:**
  - `success` (boolean)
  - `message` (string)
  - `user` (object)
  - `token` (string)
- **Frontend success handling:** stores `user` and `token` in `localStorage`, shows toast, navigates to `/`

### 3) Get Event List (Home)

- **Endpoint:** `GET /api/events/`
- **Auth:** Not required (current frontend call)
- **Query params used by frontend:**
  - `search` (string)
  - `location` (string)
  - `category` (string)
  - `page` (number)
  - `limit` (number)

Example:

```text
/api/events/?search=react&location=delhi&category=tech&page=1&limit=5
```

- **Expected success response fields used by frontend:**
  - `success` (boolean)
  - `data.events` (array)
  - `data.pagination` (object with at least `page` and `totalPages`)

### 4) Get Event Details

- **Endpoint:** `GET /api/events/:eventId`
- **Auth:** Not required (current frontend call)
- **Path param:** `eventId`
- **Expected success response fields used by frontend:**
  - `success` (boolean)
  - `data` (event object)
  - `availableSeats` (number)

### 5) Register for Event

- **Endpoint:** `POST /api/registration/`
- **Auth:** Required
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Request body:**

  ```json
  {
    "eventId": "<event_id>"
  }
  ```

- **Expected response fields used by frontend:**
  - `success` (boolean)
  - `message` (string)
- **Frontend handling:**
  - `success: true` -> success toast
  - `success: false` -> info toast (for already-registered/full/etc.)

### 6) Get Registered Events (Dashboard)

- **Endpoint:** `GET /api/registration/`
- **Auth:** Required
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Expected success response fields used by frontend:**
  - `success` (boolean)
  - `registeredEvents` (array)

### Response Shape Recommendation

To stay compatible with this frontend, keep response structure consistent:

```json
{
  "success": true,
  "message": "Optional human-readable message",
  "data": {}
}
```

### CORS Requirement

Backend must allow CORS for the frontend origin (for local dev, typically `http://localhost:5173`).

## Auth Persistence

- User and token are stored in `localStorage` using keys:
  - `user`
  - `token`
- On logout, both keys are removed.

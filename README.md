# Grand Royal Hotel Restaurant Management System

A full-stack hotel and restaurant management platform with a luxury public landing page, dynamic menu, table reservations, and an admin dashboard for menu and reservation management.

![Grand Royal Hero](./docs/screenshots/hero-desktop.png)
<!-- Add screenshots to docs/screenshots/ — see docs/screenshots/README.md -->

---

## Project Overview

**Grand Royal** is a modern web application built for fine-dining restaurants and hotel restaurants. The public site showcases the brand with a black-and-gold luxury aesthetic, live menu data from the API, and a validated reservation flow. The admin dashboard provides CRUD operations for menu items and reservations with search, filter, and status management.

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| Backend | Express 5, TypeScript, Mongoose |
| Database | MongoDB Atlas |

---

## Features

### Public Website
- Responsive luxury landing page (Hero, Featured, About, Menu, Gallery, Testimonials, Contact)
- Dynamic menu loaded from REST API with category grouping
- USD pricing display on public menu (`$45`, `$12.50`)
- Table reservation form with client-side validation, loading states, and success/error feedback
- SEO metadata, Open Graph tags, `sitemap.xml`, and `robots.txt`
- Optimized images via `next/image`
- Accessibility: skip link, semantic HTML, ARIA labels, keyboard-friendly navigation

### Admin Dashboard
- Menu CRUD with availability toggle and dashboard statistics
- Reservation management with search, date filter, status filter, and sorting
- Inline reservation editing and status updates

### Backend API
- RESTful endpoints for menus and reservations
- MongoDB Atlas persistence via Mongoose
- CORS configured for production frontend origins

---

## Screenshots

| Screenshot | Description |
|------------|-------------|
| ![Hero](./docs/screenshots/hero-desktop.png) | Landing page hero |
| ![Menu](./docs/screenshots/menu-section.png) | Public menu section |
| ![Reservation](./docs/screenshots/reservation-form.png) | Reservation form |
| ![Admin Menu](./docs/screenshots/admin-menu-dashboard.png) | Admin menu dashboard |
| ![Admin Reservations](./docs/screenshots/admin-reservations-dashboard.png) | Admin reservations |
| ![Mobile](./docs/screenshots/mobile-hero.png) | Mobile responsive view |

> Placeholder paths above. Capture screenshots locally and save them to `docs/screenshots/`. See [docs/screenshots/README.md](./docs/screenshots/README.md) for the recommended list.

---

## Tech Stack

**Frontend:** Next.js · React · TypeScript · Tailwind CSS · React Icons

**Backend:** Node.js · Express · Mongoose · CORS · dotenv

**Database:** MongoDB Atlas

**Tooling:** ESLint · tsx · Geist fonts

---

## Folder Structure

```text
Hotel-Resturant-System/
├── client/                          # Next.js frontend
│   ├── public/images/               # Static assets
│   ├── src/
│   │   ├── app/                     # App Router pages & metadata
│   │   │   ├── admin/               # Admin dashboard routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── sitemap.ts
│   │   │   └── robots.ts
│   │   ├── components/
│   │   │   ├── home/                # Landing page sections
│   │   │   ├── layout/              # Navbar, Footer
│   │   │   └── ui/                  # Reusable UI primitives
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/
│   │   │   ├── api/                 # API client functions
│   │   │   ├── constants/           # Site & API config
│   │   │   └── validation/          # Form validation
│   │   └── types/                   # TypeScript interfaces
│   └── .env.example
│
├── backend/                         # Express API
│   └── src/
│       ├── config/                  # Database connection
│       ├── controllers/             # Route handlers
│       ├── models/                  # Mongoose schemas
│       ├── routes/                    # API routes
│       ├── app.ts                     # Express app & CORS
│       └── server.ts                  # Server entry point
│
├── docs/screenshots/                # Portfolio screenshots
├── DEPLOYMENT.md                    # Vercel + Render guide
└── README.md
```

---

## Installation

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/Chathuni-Nimesha/hotel-resturant-system.git
cd hotel-resturant-system
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

### 3. Frontend setup

```bash
cd client
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

---

## Environment Variables

### Frontend (`client/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (no trailing slash) | `http://localhost:5000` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO, sitemap, canonical | `http://localhost:3000` |

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `CLIENT_URL` | Allowed CORS origin(s), comma-separated | `http://localhost:3000` |
| `NODE_ENV` | Environment label | `development` |

See [`.env.example`](./client/.env.example) and [`backend/.env.example`](./backend/.env.example) for templates.

---

## API Endpoints

Base URL: `{NEXT_PUBLIC_API_URL}` (default `http://localhost:5000`)

### Menus

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/menus` | List all menu items |
| `POST` | `/api/menus` | Create a menu item |
| `PUT` | `/api/menus/:id` | Update a menu item |
| `DELETE` | `/api/menus/:id` | Delete a menu item |

**Create/Update body:**

```json
{
  "name": "Grilled Salmon",
  "category": "Main Course",
  "price": 45,
  "description": "Fresh Atlantic salmon with herbs",
  "image": "https://example.com/salmon.jpg",
  "available": true
}
```

### Reservations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/reservations` | List all reservations |
| `POST` | `/api/reservations` | Create a reservation |
| `PUT` | `/api/reservations/:id` | Update a reservation |
| `DELETE` | `/api/reservations/:id` | Delete a reservation |

**Create body:**

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+94771234567",
  "date": "2026-08-15",
  "time": "19:30",
  "guests": 4,
  "diningArea": "Main Hall",
  "specialRequests": "Window seat preferred"
}
```

---

## Deployment Guide

Production deployment uses **Vercel** (frontend), **Render** (backend), and **MongoDB Atlas** (database).

See the full step-by-step guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

Quick summary:

1. Create MongoDB Atlas cluster and copy `MONGO_URI`
2. Deploy backend to Render with `MONGO_URI` and `CLIENT_URL`
3. Deploy frontend to Vercel with `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL`
4. Verify menu load, reservation submit, and admin CRUD against production URLs

---

## Future Improvements

- Admin authentication and role-based access control
- Toast notifications and confirmation dialogs (replace `alert`/`confirm`)
- Email notifications for reservation confirmations
- Menu search and category filters in admin
- Payment integration for deposits
- Multi-language support
- Automated CI/CD pipeline and test suite

---

## License

This project is open source under the [MIT License](./LICENSE).

---

## Author

**Chathuni Nimesha**

GitHub: [Chathuni-Nimesha](https://github.com/Chathuni-Nimesha)

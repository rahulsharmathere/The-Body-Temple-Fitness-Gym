<div align="center">

# 🏋️ The Body Temple Fitness Gym

**A full-stack gym management web application** — a public marketing site plus a
role-based dashboard for gym admins and members.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://the-body-temple-fitness-gym.vercel.app)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)

</div>

---

## About

The Body Temple Fitness Gym (BTF) is a MERN-stack application built to
manage a real gym's day-to-day operations: onboarding members, tracking
attendance, managing memberships/plans, and letting members follow their own
fitness progress — alongside a public-facing marketing site for the gym
itself.

It's built as an MVC-style REST API on the backend and a React SPA on the
frontend, with JWT-based authentication and two user roles: **admin** and
**member**.

**Live demo:** https://the-body-temple-fitness-gym.vercel.app

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Scripts](#scripts)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Features

### Public site
- Landing page with gym info, plans, and a contact form
- Content (about/contact details) editable by the admin, no redeploy needed

### Admin dashboard
- One-time admin registration (`/api/auth/register`)
- Add, view, edit, and remove members
- Create and manage membership plans, assign/renew member memberships
- View member details, attendance, and progress
- Manage general site settings and gym info shown on the public site

### Member dashboard
- First-login flow: set a new password + complete profile
- Mark daily attendance and view attendance history/streaks
- View current membership status and plan details
- Log and track body weight / progress over time (with BMI calculation)
- Manage own profile

### Auth & security
- JWT authentication via HTTP-only cookies
- Role-based route protection (admin vs member)
- Password hashing with bcrypt
- OTP-based forgot-password flow via email (Nodemailer)

---

## Tech Stack

**Frontend** (`btf-frontend/`)
- [React 19](https://react.dev/) (Vite)
- [React Router v7](https://reactrouter.com/) for routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for API calls
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
- [Lucide React](https://lucide.dev/) for icons

**Backend** (`btf-backend/`)
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) (`jsonwebtoken`) for auth, `cookie-parser` for cookie handling
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- [Nodemailer](https://nodemailer.com/) for transactional email (OTP / forgot password)
- MVC architecture: `controllers/`, `models/`, `routes/`, `middleware/`, `validators/`, `utils/`

**Deployment**
- Frontend: [Vercel](https://vercel.com/)
- Backend: any Node host (Render, Railway, etc.) + MongoDB Atlas

---

## Project Structure

```
The-Body-Temple-Fitness-Gym/
├── btf-backend/
│   ├── server/
│   │   ├── config/        # DB connection
│   │   ├── controllers/   # request handlers
│   │   ├── middleware/    # auth guard, error handler
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # route definitions
│   │   ├── utils/         # helpers (BMI, streaks, temp password, date math)
│   │   ├── validators/    # request validation
│   │   ├── app.js         # Express app + route wiring
│   │   └── server.js      # entry point
│   └── package.json
│
└── btf-frontend/
    ├── src/
    │   ├── api/            # axios instance / base URL
    │   ├── Components/     # shared UI components
    │   ├── Pages/
    │   │   ├── Public/     # landing page
    │   │   ├── Auth/       # login
    │   │   ├── Admin/      # dashboard, members, settings, setup
    │   │   └── Member/     # dashboard, attendance, membership, progress, profile
    │   └── App.jsx
    └── package.json
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A MongoDB instance (local install or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo

```bash
git clone https://github.com/rahulsharmathere/The-Body-Temple-Fitness-Gym.git
cd The-Body-Temple-Fitness-Gym
```

### 2. Backend setup

```bash
cd btf-backend
npm install
```

Create a `.env` file in `btf-backend/` (see [Environment Variables](#environment-variables) below), then:

```bash
npm run dev        # starts the API with nodemon on http://localhost:4000
```

Once the server is running, hit `POST /api/auth/register` **once** to create
the admin account (e.g. via Postman/curl or a temporary form), then log in
and start adding members from the admin panel.

### 3. Frontend setup

In a new terminal:

```bash
cd btf-frontend
npm install
```

Create a `.env` file in `btf-frontend/`:

```env
VITE_API_BASE=http://localhost:4000/api
```

Then start the dev server:

```bash
npm run dev         # http://localhost:5173
```

---

## Environment Variables

**`btf-backend/.env`**

| Variable         | Description                                              |
|------------------|------------------------------------------------------------|
| `PORT`           | Port for the API server (defaults to `4000`)                |
| `MONGO_URI`      | MongoDB connection string                                  |
| `JWT_SecretKey`  | Secret used to sign JWTs                                   |
| `CLIENT_URL`     | Frontend origin, for CORS (e.g. `http://localhost:5173`)   |
| `SENDER_EMAIL`   | Email address used to send OTP / password-reset emails      |
| `EMAIL_PASSWORD` | App password / credential for the sender email account      |
| `NODE_ENV`       | `development` or `production`                              |

**`btf-frontend/.env`**

| Variable        | Description                                  |
|-----------------|-----------------------------------------------|
| `VITE_API_BASE` | Base URL of the backend API (e.g. `http://localhost:4000/api`) |

> ⚠️ Never commit real `.env` files — they're already covered by `.gitignore`.

---

## API Overview

All responses follow the shape `{ success, message, data }`. Base path: `/api`.

| Area              | Endpoints (examples)                                                                 |
|--------------------|----------------------------------------------------------------------------------------|
| Auth               | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `PATCH /auth/change-password`, `POST /auth/forgot-password/*` |
| Members (admin)    | `GET/POST /members`, `GET/PATCH/DELETE /members/:id`                                  |
| Profile (member)   | `GET /profile/me`, `PATCH /profile/complete`, `PATCH /profile/me`                     |
| Plans              | `GET /plans` (public), `POST/PATCH/DELETE /plans/:id` (admin)                         |
| Memberships        | `GET /memberships/me` (member), `POST /memberships` (admin), `PATCH /memberships/member/:userId/renew` |
| Attendance         | `POST /attendance` (member marks today), `GET /attendance/me`                         |
| Progress           | `POST /progress` (log weight), `GET /progress/me`                                      |
| Gym info           | `GET /gym-info` (public), `PATCH /gym-info` (admin)                                    |
| Contact            | `POST /contact/send`                                                                   |

For full details, see [`btf-backend/README.md`](./btf-backend/README.md).

---

## Scripts

**Backend**

| Command       | Description                        |
|---------------|--------------------------------------|
| `npm start`   | Run the server (production)          |
| `npm run dev` | Run with nodemon (auto-restart)      |

**Frontend**

| Command         | Description                  |
|-----------------|-------------------------------|
| `npm run dev`   | Start the Vite dev server     |
| `npm run build` | Build for production          |
| `npm run preview` | Preview the production build |
| `npm run lint`  | Run ESLint                    |

---

## Roadmap

- [ ] Payment gateway integration for membership renewals
- [ ] Automated tests (unit/integration)
- [ ] Push/email reminders for expiring memberships
- [ ] Admin analytics dashboard (revenue, active members, attendance trends)

---

## Author

**Rahul Sharma** — [@rahulsharmathere](https://github.com/rahulsharmathere)

---

## License

This project is licensed under the ISC License.

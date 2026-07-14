# The BTF - Backend

Gym management API, refactored into a clean MVC structure with JWT auth
and two roles: **admin** and **member**.

## Structure

```
server/
  config/       DB connection
  controllers/  request handlers
  middleware/   auth, role guard, error handler
  models/       mongoose schemas
  routes/       route definitions
  utils/        small helpers (temp password, date math, BMI)
  validators/   lightweight request validation
  app.js        express app + route wiring
  server.js     entry point
```

## Roles

- **admin** - manages members, membership plans, assigns/renews memberships,
  and edits the public site content.
- **member** - logs in, completes their profile on first login, marks daily
  attendance, and tracks their weight/progress.

Only an admin can create member accounts (`POST /api/members`). A temporary
password is generated and returned once - send it to the member however you
like (email, WhatsApp, etc). On first login the member must change their
password and complete their profile before the rest of the app becomes
available (`isProfileCompleted`).

## API overview

All responses follow `{ success, message, data }`.

- `POST /api/auth/register` - one-time admin setup
- `POST /api/auth/login` / `POST /api/auth/logout` / `GET /api/auth/me`
- `PATCH /api/auth/change-password`
- `POST /api/auth/forgot-password/*` - OTP based reset

- `GET|POST /api/members`, `GET|PATCH|DELETE /api/members/:id` (admin)
- `GET /api/profile/me`, `PATCH /api/profile/complete`, `PATCH /api/profile/me` (member)

- `GET /api/plans` (public), `POST|PATCH|DELETE /api/plans/:id` (admin)
- `GET /api/memberships/me` (member), `POST /api/memberships` (admin assigns),
  `PATCH /api/memberships/member/:userId/renew` (admin renews)

- `POST /api/attendance` (member marks today), `GET /api/attendance/me`
- `POST /api/progress` (member logs weight), `GET /api/progress/me`

- `GET /api/gym-info` (public), `PATCH /api/gym-info` (admin) - about/contact
  content for the public website
- `POST /api/contact/send` - public contact form

## First-time setup

1. `npm install`
2. Make sure MongoDB is running locally (connection string in `.env`)
3. `npm run dev`
4. Hit `POST /api/auth/register` once to create the admin account, then log
   in and start adding members from the admin panel.

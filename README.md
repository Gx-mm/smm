# School Management System (Website + ERP + Admin Panel)

Production-ready full-stack School Management System for 5000+ students with public website, role-based dashboards, and secure APIs.

## Tech Stack
- Frontend: React + Vite + CSS
- Backend: Node.js + Express
- Database: MySQL
- Auth: JWT + bcrypt
- Payments: Stripe (extensible for Razorpay/UPI)

## Project Structure

```bash
.
├── backend
│   ├── .env.example
│   ├── package.json
│   └── src
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── models
│       ├── routes
│       ├── services
│       ├── utils
│       └── server.js
├── frontend
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── src
│       ├── api
│       ├── components
│       ├── context
│       ├── layouts
│       ├── pages
│       ├── routes
│       ├── styles
│       └── main.jsx
├── database
│   └── schema.sql
└── docs
    └── setup.md
```

## Core Features
- Public website pages: Home, About, Academics, Faculty, Gallery, Events, Admission, Contact.
- JWT auth with role-based access (student/teacher/admin).
- Student dashboard: profile, attendance, results, fees, assignments, notifications.
- Teacher dashboard: attendance marking, assignments upload, class overview.
- Admin panel: analytics, CRUD for core modules, admissions review, CMS modules.
- Payment flow + receipt PDF generation.
- Security hardening with Helmet, CORS, rate limit, validation.
- Email notifications (forgot password), bilingual dictionary endpoints, FAQ chatbot, dark/light mode.

## Setup Instructions
See: [`docs/setup.md`](docs/setup.md)

## Deployment Notes
- Use PM2 or Docker for backend process management.
- Add HTTPS at reverse proxy (Nginx / Cloud load balancer).
- Configure MySQL read replica + backups for scale.
- Enable CDN and object storage for uploads at scale.

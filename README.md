# SupplyMate

A fullstack supplies purchase request application for internal use.

---

## Tech Stack

| Layer     | Technology              | Reason                                                                  |
| --------- | ----------------------- | ----------------------------------------------------------------------- |
| Frontend  | Next.js 15 + TypeScript | Familiar stack, App Router for clean layout separation                  |
| Styling   | Tailwind CSS            | Rapid UI development with consistent design tokens                      |
| Auth      | NextAuth v4             | First-class Next.js integration, credentials provider easy to configure |
| ORM       | Prisma 7                | Type-safe DB access, excellent migration tooling                        |
| Database  | PostgreSQL 16           | Robust relational DB, well suited to approval workflow data             |
| Container | Docker + Docker Compose | Reproducible DB environment, evaluator-friendly setup                   |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker + Docker Compose

### Setup

```bash
git clone <repo-url>
cd SupplyMate

npm install

cp .env.example .env
# Fill in values — see Environment Variables section below
```

### Start the database

```bash
docker compose up -d db
```

### Run migrations and seed

```bash
npx prisma migrate deploy
npx prisma db seed
```

### Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Credentials

| Role     | Email             | Password     |
| -------- | ----------------- | ------------ |
| Admin    | admin@example.com | admin1234    |
| Employee | alice@example.com | employee1234 |
| Employee | bob@example.com   | employee1234 |

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
POSTGRES_USER=supplies_user
POSTGRES_PASSWORD=supplies_password
POSTGRES_DB=supplies_db

DATABASE_URL="postgresql://supplies_user:supplies_password@localhost:5432/supplies_db"

NEXTAUTH_SECRET=        # generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

// env values to be hidden with third party app later.

---

## Data Model

### User

| Field    | Type          | Notes             |
| -------- | ------------- | ----------------- |
| id       | String (cuid) | Primary key       |
| email    | String        | Unique            |
| name     | String        |                   |
| password | String        | bcrypt hashed     |
| role     | Role          | EMPLOYEE or ADMIN |

### PurchaseRequest

| Field       | Type          | Notes                                                    |
| ----------- | ------------- | -------------------------------------------------------- |
| id          | String (cuid) | Primary key                                              |
| title       | String        |                                                          |
| description | String?       | Optional                                                 |
| amount      | Decimal       | 10,2 precision                                           |
| category    | Category      | OFFICE_SUPPLIES, ELECTRONICS, FURNITURE, SOFTWARE, OTHER |
| status      | RequestStatus | PENDING, APPROVED, REJECTED                              |
| requestDate | DateTime      | Auto set on creation                                     |
| reviewedAt  | DateTime?     | Set when admin acts                                      |
| reviewNote  | String?       | Optional admin comment                                   |
| requesterId | String        | FK → User                                                |
| reviewerId  | String?       | FK → User (admin)                                        |

---

## Area of Focus — UI/UX & Frontend

The primary investment beyond core functionality was in crafting a polished,
production-feeling frontend experience.

### Landing page

- Full-screen video background with overlaid navigation and hero copy
- Poster image on video element eliminates blank flash during load
- Scroll-driven animations using Framer Motion — five feature cards converge
  to a central point as the user scrolls, followed by staggered headline reveals
- Pricing cards animate out from center on scroll with a sparkle effect on hover
- All CTAs link directly into the authenticated app

### Dashboard

- Staggered fade-in and slide-up entrance animation on each request row
- Skeleton loading state via `loading.tsx` renders instantly while server fetches data
- Status badges visually distinguish Pending, Approved, and Rejected states at a glance
- Approve and Reject actions are contextually shown only on pending requests
- Admin and employee views are role-aware with no layout shift between roles

### Microinteractions

- All interactive elements have hover and active state transitions
- Form submission states (loading, error) give immediate feedback
- Review confirmation page adapts copy and color to the action (green for approve, red for reject)

### Performance

- Heavy Framer Motion components dynamically imported with `ssr: false` — code
  split into separate chunks downloaded only when needed, reducing initial bundle size
- `loading.tsx` skeleton gives instant visual feedback before data arrives
- Video poster image renders immediately while video streams in the background

### Component architecture

- Client/server boundary respected throughout — server components fetch data,
  client components handle interactivity and animation
- Serialization layer between server and client for Prisma types
- Reusable `RequestList` component with typed props handles both employee and admin views
- Named export dynamic imports using `.then((mod) => mod.ComponentName)` pattern

---

## Compromises & Future Improvements

// to fill in at the end

---

## Time Spent

- A total of 7.5 hours

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

## Area of Focus

> **Infrastructure & DX + Business Logic**

// to fill in as I build

---

## Compromises & Future Improvements

// to fill in at the end

---

## Time Spent

// to fill in at the end

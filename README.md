# Finance App

A modern, full-stack personal finance management application built with Next.js, React, Drizzle ORM, Neon serverless Postgres, Clerk authentication, and Hono API framework. Track your accounts, categorize transactions, and visualize your financial health with beautiful charts and dashboards.

## Features
- User authentication (Clerk)
- Account, category, and transaction CRUD
- Bulk import and delete for transactions
- Dashboard with summary statistics and charts
- RESTful API (Hono, Edge runtime)
- Responsive UI with Tailwind CSS and Shadcn UI
- Serverless Postgres (Neon)

## Tech Stack
- **Frontend:** Next.js 14, React 18, Tailwind CSS, Shadcn UI
- **Backend/API:** Hono (Edge), Drizzle ORM, Neon Postgres
- **Auth:** Clerk
- **State:** React Query, Zustand
- **Charts:** Recharts

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd finance-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a `.env.local` file in the root with the following variables:
```env
DATABASE_URL=postgres://<user>:<password>@<host>/<db>
CLERK_USER_ID=<your-test-user-id> # For seeding
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database setup (Neon + Drizzle)
- Configure your Neon Postgres database and set `DATABASE_URL` accordingly.
- Generate Drizzle migrations:
  ```bash
  npm run db:generate
  ```
- Run migrations:
  ```bash
  npm run db:migrate
  ```
- (Optional) Seed the database with sample data:
  ```bash
  npm run db:seed
  ```

### 5. Start the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts
- `dev` - Start Next.js in development mode
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `db:generate` - Generate Drizzle migrations
- `db:migrate` - Run migrations
- `db:seed` - Seed the database
- `db:studio` - Open Drizzle Studio

## Database Schema
- **accounts**: id, plaidId, name, userId
- **categories**: id, plaidId, name, userId
- **transactions**: id, amount, payee, notes, date, accountId, categoryId

## API Overview
All endpoints are under `/api` and require authentication.

### Accounts
- `GET /api/accounts` - List accounts
- `GET /api/accounts/:id` - Get account by ID
- `POST /api/accounts` - Create account
- `PATCH /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account
- `POST /api/accounts/bulk-delete` - Bulk delete accounts

### Categories
- `GET /api/categories` - List categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PATCH /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `POST /api/categories/bulk-delete` - Bulk delete categories

### Transactions
- `GET /api/transactions` - List transactions (filter by date/account)
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create transaction
- `PATCH /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `POST /api/transactions/bulk-create` - Bulk create transactions
- `POST /api/transactions/bulk-delete` - Bulk delete transactions

### Summary
- `GET /api/summary` - Get dashboard summary (income, expenses, remaining, top categories, daily breakdown)

## License
MIT

---

> Built using Next.js, Drizzle ORM, Neon, Clerk, and Hono.

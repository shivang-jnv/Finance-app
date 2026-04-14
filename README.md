# Finance App

A high-performance, Full Stack personal finance SaaS architected for edge environments. It lets you track your accounts, categorize transactions, and visualize your financial health with beautiful charts and dashboards.

Built with Next.js, React, Drizzle ORM, Neon serverless Postgres and Hono API, It handles high-volume transaction ingestion, complex time-series aggregations, and provides a desktop-class reactive UI without compromising on network payloads or database compute limits.

## Architecture & Technical Decisions

This project is built to scale horizontally by operating statelessly at the edge and pushing heavy computation down to the database layer.

### 1. The Compute Layer: Vercel Edge + Hono RPC
Standard Next.js Route Handlers suffer from cold-start latency and lack built-in end-to-end type safety. 
* **Decision:** We embedded **Hono** inside the Next.js App Router (`export const runtime = 'edge'`).
* **Why:** This grants extremely lightweight routing capabilities while specifically leveraging `hono/client` for strict RPC (Remote Procedure Call) patterns. The frontend client gets perfectly inferred request inputs and response types synced from our backend Zod schemas, eliminating `any` types and manual fetch interfaces.

### 2. The Data Layer: Neon Serverless Postgres + Drizzle ORM
Traditional Postgres instances (RDS) rely on long-lived TCP connection pools, which are immediately exhausted by horizontally scaling, ephemeral Serverless Edge workers.
* **Decision:** We use **Neon Serverless** paired with the **Drizzle ORM** `neon-http` driver.
* **Why:** Instead of opening persistent database sockets, Drizzle compiles SQL down to raw strings and executes them instantly over standard HTTP/HTTPS `fetch` requests via Neon's connection proxy. This provides sub-millisecond connection times, circumvents the Edge's TCP restrictions, and protects the database from connection starvation under heavy traffic.

### 3. State & Concurrency: TanStack Query + Optimistic UI
A finance application demands a snappy, desktop-level UX and cannot wait for roundtrip network latency on every edit or deletion.
* **Decision:** **TanStack Query** acts as our asynchronous state manager with strict `onMutate` rollback handlers.
* **Why:** We utilize Optimistic UI updates. When a user edits a transaction, we intercept the request, immediately mutate the local `useQuery` cache to reflect the new state, and execute the HTTP `PATCH` in the background. If the request violates a database constraint, the query cache safely rolls back to a preserved snapshot of the previous state.

### 4. Performance: SQL Push-Downs & Virtualization
Thousands of rows of imported CSV data will quickly induce "Out of Memory" errors on limited Edge functions and freeze the browser DOM.
* **Decision 1 (Frontend):** We use **TanStack Virtual** to implement windowing. Even if an account has 10,000 transactions, the DOM strictly renders only the ~15 rows currently within the viewport, ensuring 60fps scrolling and zero memory bloat.
* **Decision 2 (Backend):** We entirely avoid the N+1 problem and in-memory JS array reduction. Instead of pulling rows into the Edge to calculate dashboards, we push computation to Neon using raw SQL aggregations (`SUM(CASE WHEN...)`, conditional `GROUP BY`). The Edge API routes data natively from O(N) database operations into O(1) payload responses.

---

## Features
* **Stateless Authentication:** Managed B2B/B2C identity via **Clerk**, verifying JWTs instantly in Edge middleware without database session lookups.
* **Bulk Data Ingestion:** Web Worker-based CSV parsing combined with atomic bulk SQL statements for jank-free large batch imports.
* **Interactive Dashboards:** Lazy-loaded **Recharts** rendering dynamically composed time-series and categorical aggregations.
* **Component System:** Accessible, headless UI primitives via **Radix UI** combined with zero-runtime-overhead **Tailwind CSS** (Shadcn UI).

## Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd finance-app
npm install
```

### 2. Environment Variables
Create a `.env.local` file explicitly mapping to your Neon and Clerk instances:
```env
DATABASE_URL=postgres://<user>:<password>@<host>/<db>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Migration
Deploy the Drizzle schema to Neon:
```bash
npm run db:generate
npm run db:migrate
```

### 4. Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000).

## Available Scripts
* `npm run dev` - Start Next.js in development mode with Hono server.
* `npm run db:generate` - Compile TypeScript schemas into raw Postgres SQL migrations.
* `npm run db:migrate` - Execute pending SQL migrations against the active Neon database.
* `npm run db:studio` - Boot a local Drizzle Studio instance for direct DB manipulation.

---
> Architected with Next.js Edge, Drizzle ORM, Neon Postgres, Clerk, and Hono RPC.

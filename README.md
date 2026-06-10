# nextjs-dashboard

> Production-ready Next.js 14 admin dashboard template with authentication, RBAC, and analytics.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

## Features

- **Auth** — Next-Auth v5 with email/password + OAuth (Google, GitHub)
- **RBAC** — Role-based access: Admin, Manager, Viewer
- **Analytics** — Recharts dashboards with real-time data
- **Dark Mode** — System-aware theme switching
- **Data Tables** — Sortable, filterable, paginated with TanStack Table
- **Forms** — React Hook Form + Zod validation
- **API** — tRPC with type-safe end-to-end calls

## Stack

```
Framework     Next.js 14 App Router
Auth          next-auth v5
Database      PostgreSQL + Prisma ORM
UI            shadcn/ui + Tailwind CSS + Radix UI
Charts        Recharts
Tables        TanStack Table v8
Forms         React Hook Form + Zod
API           tRPC v11
Deploy        Vercel + Railway
```

## Quick Start

```bash
git clone https://github.com/wpalish/nextjs-dashboard
cd nextjs-dashboard
npm install
cp .env.example .env.local
npx prisma migrate dev
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/         # Login, register pages
│   ├── (dashboard)/    # Protected dashboard routes
│   │   ├── analytics/
│   │   ├── users/
│   │   └── settings/
│   └── api/            # API routes + tRPC
├── components/
│   ├── ui/             # shadcn/ui base components
│   ├── charts/         # Recharts wrappers
│   └── tables/         # TanStack Table configs
├── lib/
│   ├── auth.ts         # next-auth config
│   ├── db.ts           # Prisma client
│   └── trpc.ts         # tRPC router
└── types/
```

## License

MIT

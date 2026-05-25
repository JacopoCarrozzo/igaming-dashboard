# TaDa B2B — Operator Portal

A production-ready B2B dashboard for iGaming operators to monitor game performance,
manage partner integrations, and configure platform settings across global markets.

Built as a frontend architecture demo targeting the TaDa Gaming tech stack.

![Dashboard Preview](public/preview.png)

## Live Demo

🔗 [tada-gaming-dashboard.vercel.app](https://tada-gaming-dashboard.vercel.app)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 — App Router |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Rendering | SSR · ISR · Server Components |
| Deploy | Vercel |

## Architecture Decisions

### Rendering Strategy

Each route uses the rendering strategy that matches its data freshness requirements:

| Route | Strategy | Why |
|-------|----------|-----|
| `/` Overview | SSR (`cache: 'no-store'`) | Live KPIs — always fresh |
| `/games` | ISR (`revalidate: 60`) | Catalog changes infrequently |
| `/games/[id]` | SSG (`generateStaticParams`) | Static at build, revalidated on demand |
| `/partners` | ISR (`revalidate: 120`) | Partner list is stable |
| `/revenue` | SSR | Financial data must never be stale |

### API Layer

All data fetching is centralized in `src/lib/api.ts`.
Mock handlers simulate the Golang backend contract — in production,
replacing `API_BASE_URL` in `.env` is the only change required.
The fetch interface, TypeScript types, and cache strategies remain identical.

```typescript
// Production swap — one line change:
// const BASE_URL = process.env.API_BASE_URL
```

### Component Boundary

`"use client"` is pushed as far down the tree as possible.
Interactive elements (filters, toggles, charts) are isolated Client Components.
All data fetching happens in Server Components — zero waterfall, zero client bundle cost.

## Project Structure
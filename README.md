# Deadlock Database

A small reference explorer for [Deadlock](https://playdeadlock.com/) heroes and shop items. Weekly assignment project — scope is intentionally limited to Heroes, Items, Abilities, and Upgrades. No players, matches, leaderboards, or stats.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Postgres)
- Data sourced from the [Deadlock Assets API](https://api.deadlock-api.com)

## Project structure

- `app/` — pages (`/`, `/heroes`, `/items`)
- `components/` — UI components, `components/ui/` is shadcn-generated
- `lib/` — Supabase client and data-fetching functions
- `supabase/migrations/` — SQL schema and permission migrations, applied in order
- `scripts/seed.ts` — one-off script that pulls real hero/item data from the Deadlock Assets API and upserts it into Supabase

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project, then in its SQL Editor run each file in `supabase/migrations/` **in order**.

3. Create `.env.local` in the project root with:

   ```
   SUPABASE_URL=
   SUPABASE_SERVICE_ROLE_KEY=

   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

   - `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — used only by `scripts/seed.ts` (server-side, never exposed to the browser). From Supabase dashboard → Project Settings → API → Project URL / `service_role` key.
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — used by the app to read data. Same Project URL, plus the `anon` `public` key from the same page.

4. Seed the database with real Deadlock data:

   ```bash
   npm run seed
   ```

5. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

# Countries Explorer

A Next.js (App Router) application for browsing, searching, and organizing
countries into custom favorite groups, with i18n and dark-mode support.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, Turbopack dev server)
- **Language:** TypeScript (strict mode)
- **Data fetching / state:** Redux Toolkit + RTK Query (`countriesApi`),
  `redux-persist` (persists favorites to `localStorage`)
- **Table:** TanStack Table via a reusable `DataTable` component
  (search, pagination, column visibility — all synced to the URL with `nuqs`)
- **UI:** Tailwind CSS v4 + shadcn/ui (Radix UI primitives)
- **i18n:** `next-intl` (locale-prefixed routing, currently `en` / `vi`)
- **Forms/validation:** React Hook Form + Zod (used by the feedback/contact form)
- **Tooling:** ESLint, Prettier, Husky (pre-commit), Storybook + Vitest
  (browser mode via Playwright) for component development/testing

## 1. Running the project locally

### Prerequisites

- **Node.js** `22.13.0` (see `.nvmrc` — use `nvm use` if you have `nvm`)
- **Yarn** `4.12.0` (Yarn Berry, pinned via `packageManager` in `package.json`
  and `.yarnrc.yml`). With Corepack enabled, running `yarn` will
  automatically use the correct version:
  ```bash
  corepack enable
  ```

### Install dependencies

```bash
yarn install
```

### Environment variables

Copy the example values below into a `.env.local` file at the project root
(the repo already ships with a `.env` / `.env.development` for convenience,
but you should use your own keys for anything beyond a quick local run):

```bash
# Used by the "send feedback" contact form (/api/contact route)
NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key

# Legacy/boilerplate vars declared in src/types/env.d.ts — not required by
# the Countries feature itself, but typed as required env vars project-wide
NEXT_PUBLIC_PASSWORD=
NEXT_PUBLIC_SOLANA_RPC_URL=
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PINATA_JWT=
NEXT_PUBLIC_GATEWAY_URL=
NEXT_PUBLIC_JUPITER_API_KEY=
```

> **Note:** The Countries API call itself (`src/stores/api/baseApi.ts`)
> currently points at `https://api.restcountries.com` with a hardcoded
> bearer token and a `// TODO` comment acknowledging it should be an
> environment variable — this was a known shortcut, see [Trade-offs](#trade-offs-made-due-to-the-2-hour-limit) below.

### Run the dev server

```bash
yarn dev
```

The app runs at [http://localhost:3001](http://localhost:3001) (custom port,
see the `dev` script) with Turbopack enabled.

### Other scripts

| Command                 | Description                                             |
| ------------------------ | -------------------------------------------------------- |
| `yarn build`             | Production build                                        |
| `yarn start`             | Serve the production build                               |
| `yarn lint`              | Run ESLint                                               |
| `yarn typecheck`         | Run `tsc --noEmit`                                       |
| `yarn format`            | Format the codebase with Prettier                        |
| `yarn storybook`         | Launch Storybook on port `6006`                          |
| `yarn i18n:check`        | Validate that all locale message files stay in sync      |

## 2. Architecture & Decisions

### Feature overview

- `src/app/[locale]/(main)/page.tsx` renders the `Countries` feature —
  a searchable, paginated data table of countries fetched from the REST
  Countries API.
- Each row can be starred and assigned to one or more **custom favorite
  groups** (create, rename, delete groups; toggle membership per row) via
  `src/components/countries/favorite.tsx`.
- Favorites are stored in Redux and persisted to `localStorage` with
  `redux-persist` (`whitelist: ['favorites']`), so groups survive a refresh
  without needing a backend.
- A `favoriteGroupId` query param lets the table switch between "all
  countries" and "a specific favorite group's countries" — state that's
  shareable via URL, per the `nuqs` convention.

### Key decisions

- **App Router + Server Components by default.** Only components that need
  interactivity (the table, favorites menu, theme/locale switchers) are
  marked `'use client'`; the page shell stays a server component.
- **RTK Query over ad-hoc `fetch`/`useEffect`.** Chosen for built-in caching,
  loading/error states, and because the project already standardizes on
  Redux Toolkit for global state (favorites needed a global store anyway for
  persistence, so RTK Query was a natural fit for data-fetching alongside it).
- **URL-driven table state (`nuqs`).** Search keyword, page, page size, and
  the active favorite group all live in the URL instead of local component
  state, so filters/pagination are shareable and survive navigation.
- **A generic `DataTable`/`useDataTable` abstraction** (TanStack Table under
  the hood) is reused rather than hand-rolling table markup, trading a
  slightly heavier dependency for consistent sorting/pagination/column
  visibility behavior.
- **shadcn/ui + Tailwind** for the whole UI layer instead of a heavier design
  system, keeping components small, accessible (Radix primitives), and easy
  to restyle.
- **next-intl** for i18n with locale-prefixed routing, so the same UI can
  ship in multiple languages without duplicating pages.

### Trade-offs made due to the 2-hour limit

- **Hardcoded API bearer token** in `baseApi.ts` instead of reading from
  `process.env` — flagged with a `TODO` in the source. Fine for a timeboxed
  exercise, not acceptable for production.
- **No automated tests were added for the Countries feature itself.**
  Vitest/Storybook is wired up project-wide for component/interaction
  testing, but there wasn't time to write unit/integration tests for the
  table, favorites reducer, or the favorite-groups UI.
- **Favorites persistence is `localStorage`-only** — there's no backend/user
  account, so favorite groups are per-browser and not shareable across
  devices.
- **Only `en`/`vi` are wired into routing** (`src/i18n/routing.ts`) even
  though extra message files (`fr`, `hi`, `zh-HK`) exist in
  `src/i18n/messages/` from an earlier iteration — they aren't fully
  translated/wired to keep scope tight.
- **Some boilerplate from the starter template remains unused** (e.g. the
  Solana/Pinata env vars in `src/types/env.d.ts`, the `data-grid`
  components, dashboard-oriented Redux slices) — left in place rather than
  ripped out to avoid risking regressions elsewhere under time pressure.
- **No dedicated country detail page** — the table shows a flat list;
  drilling into a single country's full profile (borders, currencies,
  languages, etc., which the `Country` type already models) wasn't built.
- **Basic error/loading states.** `isFetching` drives a loading state on the
  table, but there's no dedicated error UI if the countries API request
  fails.

## 3. What I'd do with more time

- **Move all secrets to environment variables** and remove the hardcoded API
  token from `baseApi.ts`; add `.env.example` and stop committing real keys
  in `.env` / `.env.development`.
- **Add a country detail view/drawer** (route or sheet) showing the rich
  data already typed in `Country` (currencies, languages, borders, region,
  population, etc.), linked from each table row.
- **Write tests:** unit tests for the `favorite` Redux slice (group
  add/rename/remove/toggle/reset logic) and interaction tests for the
  favorites dropdown and data table (search, pagination, favorite-group
  filter), using the Vitest + Storybook setup already in the repo.
- **Server-side data fetching/caching** for the initial countries list (e.g.
  prefetching in a Server Component and hydrating RTK Query) to improve LCP
  instead of fetching entirely client-side.
- **Sync favorite groups to a backend** (or at least export/import as
  JSON) so they aren't lost when `localStorage` is cleared or the user
  switches browsers/devices.
- **Finish i18n coverage** for the additional locales that already have
  message files (`fr`, `hi`, `zh-HK`) and wire them into `routing.ts`.
- **Improve error handling** with a proper error/empty state for the
  countries table and a global error boundary for the API failure case.
- **Clean up unused boilerplate** (dashboard/company/data-grid leftovers,
  unused env vars) to reduce cognitive overhead for future contributors.
- **Accessibility pass** on the favorites dropdown (focus management when
  opening/closing the alert dialog, keyboard shortcuts for row favoriting)
  and an audit with automated a11y tooling (`@storybook/addon-a11y` is
  already installed).

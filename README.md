# Countries Explorer (SS Tech Vietnam)

A Next.js (App Router) application for searching countries, marking them as
favorites, and organizing favorites into custom groups - built on top of the
[restcountries.com](https://restcountries.com) API.

- **Live demo:** [https://ss-tech-vietnam.vercel.app/](https://ss-tech-vietnam.vercel.app/)
- **Repository:** [https://github.com/Nhatcapdang/ss-tech-vietnam](https://github.com/Nhatcapdang/ss-tech-vietnam)
- **Version:** `0.0.1` (see `package.json`)

## Table of Contents

- [Tech Stack](#tech-stack)
- [How to Run the Project](#how-to-run-the-project)
- [API Usage - Countries](#api-usage---countries)
- [Why Redux Toolkit Query (RTK Query)](#why-redux-toolkit-query-rtk-query)
- [Animations](#animations)
- [Error Handling](#error-handling)
- [Accessibility](#accessibility)
- [Storybook](#storybook)
- [Git Hooks Automation (Husky)](#git-hooks-automation-husky)
- [Storage, Hosting and Code](#storage-hosting-and-code)
- [Architecture and Key Decisions](#architecture-and-key-decisions)
- [Trade-offs](#trade-offs-made-due-to-time-constraints)
- [What I'd Do With More Time](#what-id-do-with-more-time)

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, Turbopack dev server)
- **Language:** TypeScript (strict mode)
- **Data fetching / state:** Redux Toolkit + RTK Query (`countriesApi`),
  `redux-persist` (persists favorites to `localStorage`)
- **Table:** TanStack Table via a reusable `DataTable` component (search,
  pagination, column visibility - all synced to the URL with `nuqs`)
- **UI:** Tailwind CSS v4 + shadcn/ui (Radix UI / Base UI primitives)
- **Animation:** `motion` (Motion for React) + custom `animate-ui` primitive
  wrappers, `tw-animate-css` utility classes
- **i18n:** `next-intl` (locale-prefixed routing, currently `en` / `vi`)
- **Forms/validation:** React Hook Form + Zod (used by the feedback/contact
  form)
- **Tooling:** ESLint, Prettier, Husky (pre-commit), Storybook + Vitest
  (browser mode via Playwright) for component development/testing
- **Hosting:** Vercel

## How to Run the Project

### Prerequisites

- **Node.js** `22.13.0` (see `.nvmrc` - use `nvm use` if you have `nvm`)
- **Yarn** `4.12.0` (Yarn Berry, pinned via `packageManager` in
  `package.json` and `.yarnrc.yml`). With Corepack enabled, running `yarn`
  will automatically use the correct version:

  ```bash
  corepack enable
  ```

### Install dependencies

```bash
yarn install
```

### Environment variables

Copy the example values below into a `.env.local` file at the project root
(the repo already ships with `.env` / `.env.development` for convenience,
but you should use your own keys for anything beyond a quick local run):

```bash
# Used by the "send feedback" contact form (/api/contact route)
NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_REST_COUNTRIES_API_KEY='rc_'

```

> **Note:** The Countries API call itself (`src/stores/api/baseApi.ts`)
> currently points at `https://api.restcountries.com` with a hardcoded
> bearer token and a `// TODO` comment acknowledging it should be an
> environment variable - this was a known shortcut, see
> [Trade-offs](#trade-offs-made-due-to-time-constraints) below.

### Run the dev server

```bash
yarn dev
```

The app runs at [http://localhost:3001](http://localhost:3001) (custom
port, see the `dev` script) with Turbopack enabled.

### Other scripts

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `yarn build`           | Production build                                    |
| `yarn start`           | Serve the production build                          |
| `yarn lint`            | Run ESLint                                          |
| `yarn typecheck`       | Run `tsc --noEmit`                                  |
| `yarn format`          | Format the codebase with Prettier                   |
| `yarn storybook`       | Launch Storybook on port `6006`                     |
| `yarn build-storybook` | Build a static Storybook site                       |
| `yarn i18n:check`      | Validate that all locale message files stay in sync |

## API Usage - Countries

Countries data comes from the public [restcountries.com](https://restcountries.com)
API, wired up through a dedicated RTK Query endpoint
(`src/stores/api/countries/countries-api.ts`) that calls `getCountries` with
a search term (`q`) and `offset` / `limit` pagination params.

The app satisfies the "search, favorite, group, delete" requirement as
follows:

- **Search entities.** The `DataTableSearch` input writes to the `keyword`
  URL query param, which is passed as `q` to the `getCountries` query -
  results are re-fetched from the API as the user types, and the search
  term is shareable/bookmarkable via the URL.
- **Mark as favorite.** Each table row has a star toggle
  (`src/components/countries/favorite.tsx`). Clicking it opens a menu where
  the row can be added/removed from any favorite group; a filled star means
  the country belongs to at least one group.
- **Group them.** Favorites are organized into named, user-created groups
  (`GroupFavorite` in `src/stores/global/favorite.ts`): create a group from
  the "Add group" input, rename any group inline, and toggle a country's
  membership in a group with its checkbox. A `favoriteGroupId` URL param
  (`src/components/countries/favorite-filter.tsx`) lets the table switch
  between "all countries" and "a single group's countries".
- **Delete favorites.** "Reset Favorite" in the star menu removes a single
  country from every group at once (fully unfavorites it).
- **Delete groups.** Each group has a delete button that opens a
  confirmation `AlertDialog` before permanently removing the group and
  un-favoriting every country that belonged to it.

## Why Redux Toolkit Query (RTK Query)

- **The project already needs a global store.** Favorite groups have to be
  shared across the table, the star menu, and the group filter, and
  persisted with `redux-persist` - so Redux Toolkit was already a
  requirement. RTK Query is a natural extension of the same store rather
  than introducing a second data-fetching library (React Query, SWR, etc.)
  alongside it.
- **Less boilerplate than `fetch` + `useEffect`.** `createApi` generates
  typed hooks (`useGetCountriesQuery`) with `data`, `isFetching`, and
  `error` out of the box, so components don't hand-roll loading/error
  state or manage cancellation/race conditions themselves.
- **Built-in caching and request de-duplication.** Identical queries (same
  search keyword/page) are cached and de-duped automatically, which keeps
  re-renders and network calls to a minimum as the user paginates or
  re-focuses the tab.
- **Centralized, consistent error handling.** Every RTK Query rejection
  flows through one Redux middleware (see
  [Error Handling](#error-handling)) instead of each component needing its
  own try/catch and toast logic.
- **Tag-based cache invalidation** (`tagTypes`, `providesTags`) scales
  cleanly if the API grows beyond a single read-only endpoint (e.g. an
  infinite-scroll variant, `getCountriesInfinite`, already reuses the same
  base query).
- **First-class DevTools support**, matching the rest of the app's Redux
  Toolkit conventions (slices, `useAppSelector`/`useAppDispatch`).

## Animations

- **`motion`** (Motion for React, the successor to Framer Motion) powers
  interactive transitions across the UI.
- **`src/components/animate-ui/primitives/**`\*\* wraps Radix/Base UI
  primitives (dropdown menu, alert dialog, sheet, checkbox, tabs, tooltip)
  with animated enter/exit and height transitions, so menus, dialogs, and
  panels used throughout the Countries feature (favorite menu, delete
  confirmation, group filter) animate consistently instead of popping in.
- **`tw-animate-css`** supplies utility-class-based Tailwind animations
  (fade/slide/scale) for lighter-weight, CSS-only transitions where a full
  JS animation isn't needed.

## Error Handling

All API errors are handled **globally** by a single Redux middleware,
[`rtkQueryErrorLogger`](./src/stores/error-handler.ts), instead of each
component implementing its own try/catch:

```ts
export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!', action.payload)
      if (action.payload.status === 403) {
        return next(action) // let 403s be handled separately
      }
      if ('data' in action.payload) {
        action.payload.data.errors.forEach(error => toast.error(error.message))
      } else {
        toast.error(action.error.message)
      }
    }
    return next(action)
  }
```

- It uses RTK's `isRejectedWithValue` matcher to catch **every** rejected
  RTK Query thunk across the app, regardless of which endpoint triggered
  it.
- Structured API error payloads (`{ data: { errors: [...] } }`) show one
  toast per error message; unstructured/network errors fall back to the
  generic RTK Query error message.
- `403` responses are intentionally skipped here so they can be handled by
  dedicated logic (e.g. an auth/forbidden flow) instead of a generic toast.
- The middleware is registered once on the store, so any new RTK Query
  endpoint automatically gets consistent, app-wide error UX (via `sonner`
  toasts) for free.

## Accessibility

- **Icon-only controls have `aria-label`**, e.g. "Manage favorite groups"
  (star menu trigger), "Delete {group} group", "Toggle favorite in
  {group}", while purely decorative icons use `aria-hidden="true"`.
- **Destructive actions use an accessible confirmation dialog**
  (`AlertDialog`) before a group and its favorites are deleted, instead of
  deleting immediately on click.
- **Keyboard support**: pressing `Enter` in the "new group" input adds the
  group without needing the mouse; Radix/Base UI primitives (menus,
  dialogs, checkboxes) provide focus trapping/restoration and full keyboard
  navigation out of the box.
- **Semantic roles** on custom widgets, e.g. `role="toolbar"` with
  `aria-orientation="horizontal"` on the table's search/filter/view-options
  row.
- **Automated a11y auditing** via `@storybook/addon-a11y`, which runs
  accessibility checks against components directly inside Storybook.

## Storybook

Storybook is used for isolated, component-driven development and visual
review:

```bash
yarn storybook          # dev server on http://localhost:6006
yarn build-storybook    # static build for publishing/CI
```

- Framework: `@storybook/nextjs-vite`
- `@storybook/addon-a11y` - automated accessibility checks per story
- `@storybook/addon-docs` - auto-generated docs pages
- `@storybook/addon-vitest` - runs component interaction tests through
  Vitest's browser mode (Playwright)
- `@chromatic-com/storybook` - visual review/publishing integration

## Git Hooks Automation (Husky)

Husky is installed automatically via the `prepare` script and wires up a
`pre-commit` hook (`.husky/pre-commit`) that runs on every commit:

1. `yarn format` - Prettier formats the codebase
2. `git add -u` - re-stages the formatted files
3. `yarn i18n:check` - verifies translation keys stay in sync across locales
4. `yarn lint` - ESLint
5. `yarn typecheck` - `tsc --noEmit`

This guarantees that unformatted, unlinted, or type-broken code never gets
committed, without waiting on a separate CI run to catch it.

## Storage, Hosting and Code

- **Storage:** Favorite groups (`GroupFavorite[]`) live in a Redux slice and
  are persisted client-side to `localStorage` via `redux-persist`
  (`whitelist: ['favorites']`). There is no backend/database - favorites
  are per-browser and survive page refreshes but not device switches.
- **Hosting:** Deployed on [Vercel](https://vercel.com), which is a
  zero-config target for Next.js App Router apps -
  [https://ss-tech-vietnam.vercel.app/](https://ss-tech-vietnam.vercel.app/).
- **Code:** Source is hosted on GitHub at
  [Nhatcapdang/ss-tech-vietnam](https://github.com/Nhatcapdang/ss-tech-vietnam),
  written in strict TypeScript, formatted/linted via Prettier + ESLint, and
  protected by the Husky pre-commit hook described above.

## Architecture and Key Decisions

- **App Router + Server Components by default.** Only components that need
  interactivity (the table, favorites menu, theme/locale switchers) are
  marked `'use client'`; the page shell stays a server component.
- **URL-driven table state (`nuqs`).** Search keyword, page, page size, and
  the active favorite group all live in the URL instead of local component
  state, so filters/pagination are shareable and survive navigation.
- **A generic `DataTable`/`useDataTable` abstraction** (TanStack Table under
  the hood) is reused rather than hand-rolling table markup, trading a
  slightly heavier dependency for consistent sorting/pagination/column
  visibility behavior.
- **shadcn/ui + Tailwind** for the whole UI layer instead of a heavier
  design system, keeping components small, accessible (Radix/Base UI
  primitives), and easy to restyle.
- **next-intl** for i18n with locale-prefixed routing, so the same UI can
  ship in multiple languages without duplicating pages.

## Trade-offs Made Due to Time Constraints

- **Hardcoded API bearer token** in `baseApi.ts` instead of reading from
  `process.env` - flagged with a `TODO` in the source. Fine for a timeboxed
  exercise, not acceptable for production.
- **No automated tests were added for the Countries feature itself.**
  Vitest/Storybook is wired up project-wide for component/interaction
  testing, but there wasn't time to write unit/integration tests for the
  table, favorites reducer, or the favorite-groups UI.
- **Favorites persistence is `localStorage`-only** - there's no backend/user
  account, so favorite groups are per-browser and not shareable across
  devices.
- **Only `en`/`vi` are wired into routing** (`src/i18n/routing.ts`) even
  though extra message files (`fr`, `hi`, `zh-HK`) exist in
  `src/i18n/messages/` from an earlier iteration - they aren't fully
  translated/wired to keep scope tight.
- **Some boilerplate from the starter template remains unused** (e.g. the
  Solana/Pinata env vars in `src/types/env.d.ts`, the `data-grid`
  components, dashboard-oriented Redux slices) - left in place rather than
  ripped out to avoid risking regressions elsewhere under time pressure.
- **No dedicated country detail page** - the table shows a flat list;
  drilling into a single country's full profile (borders, currencies,
  languages, etc., which the `Country` type already models) wasn't built.
- **Basic error/loading states.** `isFetching` drives a loading state on
  the table, but there's no dedicated empty/error UI if the countries API
  request fails (beyond the global toast described above).

## What I'd Do With More Time

- **Move all secrets to environment variables** and remove the hardcoded
  API token from `baseApi.ts`; add `.env.example` and stop committing real
  keys in `.env` / `.env.development`.
- **Add a country detail view/drawer** (route or sheet) showing the rich
  data already typed in `Country` (currencies, languages, borders, region,
  population, etc.), linked from each table row.
- **Write tests:** unit tests for the `favorite` Redux slice (group
  add/rename/remove/toggle/reset logic) and interaction tests for the
  favorites dropdown and data table (search, pagination, favorite-group
  filter), using the Vitest + Storybook setup already in the repo.
- **Server-side data fetching/caching** for the initial countries list
  (e.g. prefetching in a Server Component and hydrating RTK Query) to
  improve LCP instead of fetching entirely client-side.
- **Sync favorite groups to a backend** (or at least export/import as
  JSON) so they aren't lost when `localStorage` is cleared or the user
  switches browsers/devices.
- **Finish i18n coverage** for the additional locales that already have
  message files (`fr`, `hi`, `zh-HK`) and wire them into `routing.ts`.
- **Dedicated empty/error state** for the countries table and a React
  error boundary around the API failure case, on top of the existing
  global toast handling.
- **Clean up unused boilerplate** (dashboard/company/data-grid leftovers,
  unused env vars) to reduce cognitive overhead for future contributors.
- **Add CI** (e.g. GitHub Actions) to run `lint`, `typecheck`, and
  Storybook/Vitest tests on every pull request, complementing the local
  Husky pre-commit hook.

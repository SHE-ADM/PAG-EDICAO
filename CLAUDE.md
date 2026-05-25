# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

pnpm workspace monorepo with two apps under `apps/*`:

| App | Stack | Default port | Purpose |
|---|---|---|---|
| `apps/web` | React 19 + Vite 8 + TypeScript 6 | 5173 | SPA frontend |
| `apps/api` | Next.js 16.2.6 + React 19 + TypeScript 5 | 3001 | Backend HTTP API (Route Handlers only) |

This repo intentionally deviates from the Sheild workspace template documented in
`c:\Sheild\Projetos\Claude\CLAUDE.md` and its `rules/*`: it uses `apps/*` instead of
`client/server/shared/`. Do **not** add `shared/`, `client/`, or `server/` folders or
suggest scaffolding pieces from that template (Zod schemas in `shared/`, Supabase Auth
flows in `client/`, V001 migrations, etc.) unless the user explicitly asks for it.

Package manager is pinned: `pnpm@11.1.2` via root `packageManager` field.

## Commands

Run from the repo root (all scripts live in the root `package.json`):

| Command | Action |
|---|---|
| `pnpm dev:api` | Next.js dev server on port 3001 |
| `pnpm dev:web` | Vite dev server on port 5173 |
| `pnpm dev` | Both apps in parallel (`pnpm -r --parallel dev`) |
| `pnpm build:api` / `build:web` | Per-app build |
| `pnpm build` | All packages |
| `pnpm start:api` | `next start` on port 3001 (production runtime) |
| `pnpm preview:web` | Vite production preview |
| `pnpm lint:api` / `lint:web` / `pnpm lint` | ESLint |
| `pnpm test:web` | Vitest one-shot (`vitest run`) — used in CI/precommit |
| `pnpm --filter web test` | Vitest watch mode (interactive) |
| `pnpm test` | All packages with `test:run` (currently only `web` defines one) |

Only `apps/web` has a test runner (Vitest + Testing Library). `apps/api` has no
test setup yet — do not assume `pnpm --filter api test` exists.

## Version caveats — read before writing code

- **`apps/api` is Next.js 16.2.6.** This release has breaking changes vs.
  pre-2026 conventions in training data. Before editing routes, configs, or
  caching behavior, consult `apps/api/node_modules/next/dist/docs/` for current
  APIs and heed deprecation notices. Notable: Route Handlers live at
  `app/**/route.ts` (App Router), use Web `Request`/`Response` APIs, are not
  cached by default; Cache Components introduce `use cache` and `cacheLife`.
- **`apps/web` runs React 19, Vite 8, TypeScript 6, ESLint 10.** Verify imports
  and APIs against installed `node_modules` before extrapolating from older
  patterns.

## API (`apps/api/`) — Next.js as backend only

The app is configured as a Next.js project but used purely as a backend — it
exposes Route Handlers and has no real UI pages.

- Route Handlers live under `app/**/route.ts` (e.g. `app/api/health/route.ts`).
- `app/layout.tsx` is a minimal root layout required by App Router; do not add
  page components, fonts, or global CSS unless the user explicitly asks for UI.
- Path alias `@/*` resolves to the app root (`apps/api/*`).
- Dev/start scripts pin port `3001` (`next dev --port 3001`, `next start --port 3001`)
  to avoid colliding with `apps/web` on `5173` and Next.js' default `3000`.
- Type-checking is folded into `next build`; there is no separate `typecheck`
  script — running `tsc --noEmit` outside of Next will miss `.next/types/**`.

### REST conventions (mandatory)

Route Handlers under `app/api/**` must follow REST principles strictly:

- **Resources are plural nouns** in the URL: `/api/payments`, `/api/users/{id}`.
  Never verbs (`/api/getPayment`, `/api/createUser`).
- **HTTP methods carry semantics**: `GET` read (safe, idempotent), `POST` create,
  `PUT` full replace (idempotent), `PATCH` partial update, `DELETE` remove
  (idempotent). Never accept `POST` for reads or `GET` with side effects.
- **Status codes are specific**: `200` OK, `201` Created (return `Location`
  header pointing at the new resource), `204` No Content (for `DELETE` and
  empty `PUT`/`PATCH`), `400` malformed request, `401` unauthenticated,
  `403` forbidden, `404` not found, `409` conflict, `422` validation failure,
  `5xx` server errors. Do not return `200` on errors.
- **Stateless**: every request carries its own auth (header/token). No
  server-side session storage; do not rely on prior request state.
- **No RPC-style endpoints**: model side effects as state transitions on a
  resource (e.g. `POST /api/payments/{id}/refunds` over `POST /api/refundPayment`).
- **Errors have a consistent JSON shape** — define it before the first error
  path ships and reuse it across all routes.

## Web (`apps/web/`)

- Plain Vite + React 19 SPA. Entry: `src/main.tsx`, root component: `src/App.tsx`.
- Build is `tsc -b && vite build`; the project-references-style `tsc -b`
  expects `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` to stay
  in sync.

### Frontend conventions (mandatory)

- **Atomic Design** for component organization under `src/components/`:
  `atoms/` (buttons, inputs, labels), `molecules/` (form rows, cards),
  `organisms/` (headers, complex panels), `templates/` (page layouts).
  Pages under `src/pages/` compose templates and organisms — they should not
  contain raw atoms or layout primitives.
- **Tailwind v4 for styling** — all visual styling uses Tailwind utility
  classes. No CSS Modules, no styled-components, no inline `style={{}}` when a
  Tailwind class can express the same thing. Tailwind is wired via the
  `@tailwindcss/vite` plugin and a single `@import "tailwindcss"` at the top of
  `src/index.css` — there is intentionally no `tailwind.config.js`; customize
  via CSS `@theme` blocks. Use `cn()` from `src/lib/utils.ts` (built on `clsx`
  + `tailwind-merge`) for conditional classes.
- **Every component has a test** covering its essential use: it mounts with
  required props, renders its primary content, and reacts to its main
  interaction (click, change, submit). Tests live alongside the component
  (`Button.tsx` + `Button.test.tsx`). Stack: Vitest + Testing Library
  (`@testing-library/react`, `@testing-library/user-event`,
  `@testing-library/jest-dom`) running in `jsdom` with `globals: true`, so
  `describe`/`it`/`expect` are available without imports. Setup file:
  `src/test/setup.ts`. See `src/App.test.tsx` for the reference pattern.

## pnpm workspace

`pnpm-workspace.yaml` declares `apps/*` as workspace packages and uses an
explicit `allowBuilds` allowlist for postinstall scripts. Current entries:
`sharp`, `unrs-resolver`, `esbuild`. Any new native dependency that needs a
postinstall must be added here, otherwise pnpm blocks it silently and the dep
may fail at runtime (the user gets `[ERR_PNPM_IGNORED_BUILDS]` on install).

## Git workflow (enforced by user policy)

- Remote: `https://github.com/SHE-ADM/Pag-Edicao.git`.
- **Never commit or push to `main`.** `main` is promoted manually by the repo
  owner via PR on GitHub. Local `main` exists only to mirror `origin/main`.
- All work lands on the `Features` branch. Short-lived `feat/<x>` or `fix/<x>`
  branches branch off `Features` and merge back into `Features`.
- `.claude/settings.local.json` is gitignored at the repo root — never stage it.

### Commit messages — Conventional Commits (mandatory)

All commits follow [Conventional Commits](https://www.conventionalcommits.org/):

- Format: `type(scope): subject` — subject in imperative mood, no trailing period,
  ~72 chars max.
- Allowed types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`,
  `ci`, `build`, `style`, `revert`.
- Scope is the app or area touched: `api`, `web`, `workspace`, `deps`, or a
  feature name. Omit `()` when the change is repo-wide and doesn't fit a scope.
- Breaking changes: append `!` after type/scope (`feat(api)!: ...`) and add a
  `BREAKING CHANGE: <explanation>` footer.
- Existing history already follows this pattern (e.g.
  `feat(api): scaffold...`, `refactor(workspace): rename react-app to web...`)
  — keep it consistent.

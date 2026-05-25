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

No test runner is configured in either app — do not assume `pnpm test` exists.

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

## Web (`apps/web/`)

- Plain Vite + React 19 SPA. Entry: `src/main.tsx`, root component: `src/App.tsx`.
- Build is `tsc -b && vite build`; the project-references-style `tsc -b`
  expects `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` to stay
  in sync.

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

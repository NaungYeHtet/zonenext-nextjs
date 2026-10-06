# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Zone Next is a bilingual (English / Burmese) real-estate listing frontend built with Next.js 14 (App Router), TypeScript, and Tailwind. It has no backend of its own: all data comes from an external REST API whose base URL is `NEXT_PUBLIC_API_PATH` (see `.env.example`, e.g. `http://zonenext.test/apis`).

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint     # next lint (next/core-web-vitals + next/typescript)
```

There is no test suite. Use `npm run lint` and `npm run build` to validate changes. Formatting is Prettier with `prettier-plugin-tailwindcss` (sorts Tailwind classes).

## Architecture

### Routing and locales
- Nearly everything lives under `app/[locale]/`. Locales are configured in `i18nConfig.ts` (`en`, `my`; `en` is the default and is **not** prefixed in URLs).
- `middleware.ts` runs on every non-asset request: it applies auth redirects first, then hands off to `next-i18n-router`. `/auth/google/callback` is excluded and lives outside `[locale]` in `app/auth/` (with its own root layout).
- `app/[locale]/` holds shared code alongside routes: `components/`, `lib/` (auth helpers, token cookie actions, shared types in `index.d.ts`), and `utils/` (`fetchApi`, API paths, constants, i18n init).
- Property search is a single optional catch-all route: `search/[list_type]/[[...filters]]/page.tsx`. `parse-filters.ts` beside it parses `state` / `township` / `type` key–value segments in that fixed order and 404s anything else. URLs are built in `components/property/filter/filter.tsx`, which must keep the same order. When changing search behavior, edit `wrapper.tsx` / `components/property/*`.

### Data fetching
- All API calls go through `fetchApi` in `app/[locale]/utils/helpers.tsx`. For `GET`, `body` is serialized into the query string (empty values are stripped); for `POST` it becomes the JSON body. Endpoint paths are centralized in `utils/api-paths.ts`.
- `fetchApi` handles errors by redirecting: 404 → `/404`, 401 → clears token and goes to `/login`, 409 → `/verification` (unverified email).
- Pages are async server components that call `fetchApi` directly; pass Next cache options via `options` (e.g. `{ next: { revalidate: ... } }`).
- The locale is usually passed to the API as a `language` field in `body`.

### Auth
- Auth is a bearer token stored in the `access_token` cookie via `js-cookie` (`lib/actions.ts`, `utils/constants.ts`). `fetchApi({ requireAuth: true })` reads it with `js-cookie`, so authenticated requests only work from client components.
- Route guarding is in `lib/auth.ts`: `protectedRoutes` (redirect to `/login` when logged out) and `guestRoutes` (redirect to `/profile` when logged in). Add new protected/guest routes there.
- Client-side auth state (`isLoggedIn`, `user`, `logout`) comes from `AuthContext` in `components/providers/auth-context.tsx`, mounted via `AuthProviderClient` in the pages that need it.
- Google login: the backend redirects to `/auth/google/callback?code=...`, which exchanges the code with the API and stores the token.

### i18n
- Translation JSON lives in `locales/{en,my}/<namespace>.json` (namespaces: `default`, `general`, `validation`, `rating`, `verification`). Add keys to **both** locales.
- Pattern for each page: the server component calls `initTranslations(locale, namespaces)` (`utils/i18n.js`) and wraps its tree in `TranslationsProvider` with the returned `resources`; client components then use `useTranslation()` or the `TranslateText` component. Namespaced keys use `ns:key` (e.g. `rating:excellent`).

### Forms and UI
- Forms use `react-hook-form` with `yup` schemas via `@hookform/resolvers`; feedback uses `react-toastify` (`ToastContainer` is in the root layout).
- Use the `cn()` helper (clsx + tailwind-merge) from `utils/helpers.tsx` to compose class names. The Tailwind theme defines custom `primary` / `secondary` color scales and `noto_sans` / `poppins` font families.
- Import alias `@/*` maps to the repo root.

## Project skills

`.claude/skills/` contains project skills (`typescript-best-practices`, `writing-plans`, `subagent-driven-development`, `code-simplification`) that apply to work in this repo.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository conventions

- Use English for code and comments. Plans should be written in Traditional Chinese.
- Do not use Simplified Chinese anywhere.
- Use pnpm to manage packages — never npm.
- Do not create `.md` conclusion files after tasks.
- Do not run `open` after finishing tasks.
- The `middleware` file convention is deprecated — `src/proxy.ts` fills that role.
- Reference `.project/tech.md` and `.project/style.md` for tech stack and style decisions, and `.project/backlog.md` for known outstanding work.

## Commands

```bash
pnpm dev               # Start dev server
pnpm build             # Production build
pnpm lint              # ESLint
pnpm validate:cards    # Validate card/category translations across all 3 locales
```

No test runner is configured.

## Environment setup

Copy `.env.example` to `.env.local` and fill in:
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — from Supabase dashboard
- `WORKOS_API_KEY`, `WORKOS_CLIENT_ID`, `WORKOS_COOKIE_PASSWORD` (min 32 chars, generate with `openssl rand -hex 32`)
- `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_WORKOS_REDIRECT_URI`

## Architecture

**Next.js 16 App Router** with TypeScript, Tailwind CSS 4, Shadcn/UI, Supabase (PostgreSQL), WorkOS AuthKit, next-intl. Hosted on Vercel.

### Proxy (src/proxy.ts)

Replaces Next.js middleware. On every matched request it runs WorkOS `authkit()`, then handles locale routing:

- **Public pages are locale-prefixed** (`/{locale}/...`); **private pages are not** (`/explore`, `/records`, `/account`).
- Locale resolution order: locale cookie → profile `locale_preference` (admin client lookup) → default/accept-language.
- It redirects `/` to the localized home, adds missing locale prefixes on public paths, and strips locale prefixes from private paths.
- The resolved locale is passed to the app via a request header and persisted in a cookie.

### Authentication flow

WorkOS AuthKit handles login. `/auth/sign-in`, `/auth/sign-up`, `/auth/sign-out` are route handlers that redirect to WorkOS. On callback (`/api/auth/callback`), a profile is upserted in Supabase. Subsequent API requests pass the WorkOS access token to Supabase as a user-scoped client, which Supabase verifies via WorkOS's JWKS endpoint to enforce RLS.

Three Supabase client factories in `src/lib/supabase.ts` (each returns `null` when env vars are missing — callers must handle it):
- `createAnonClient()` — public reads (emotion_categories, emotion_cards, about_emotions)
- `createAdminClient()` — service role, bypasses RLS; only for profile sync and proxy locale lookups
- `createUserClient(accessToken)` — user-scoped with WorkOS JWT; used for all user data operations (records, profile updates)

`withAuthContext` (`src/lib/auth-context.ts`) builds the auth context (user + user-scoped client) for API routes.

### Database

Migrations live in `supabase/migrations/`, applied in filename order. Do not delete applied migrations.

Schema-only migrations are tracked in git. Migrations 003/004 exist locally but are deliberately gitignored because they contain real migrated user PII, as do the legacy user-migration scripts and `scripts/output/` — never commit or weaken those ignore rules.

Key tables: `profiles`, `emotion_records`, `emotion_categories`, `emotion_cards`, `about_emotions`.

`emotion_records` stores narrative fields (story, reaction, results, feelings, expect, actions), up to 3 emotion card references, before/after emotion levels (1–10), and a `search_vector` for full-text search with CJK support.

### i18n

Three locales: `en`, `ja`, `zh-TW`.
- UI messages: `src/messages/{locale}.json`, served by next-intl.
- Card/category content: `src/data/cards/cards.{locale}.json` and `categories.{locale}.json` — checked by `pnpm validate:cards`.
- Locale helpers (prefix extraction, public-path detection, cookie options): `src/lib/i18n/locale.ts`.

### Routing structure

```
(public)/[locale]/                    localized public pages
  /                                   home
  /about-emotions                     emotion education page
  /emo-cards                          browse card categories
  /emo-cards/[category]               browse cards in a category
(non-localized root pages just redirect to the default-locale version)

(auth)/                               auth-required, no locale prefix
  /explore                            emotion record flow entry
  /explore/cards[/[category]]         card selection step
  /explore/strength/1, /strength/2    before-level steps
  /explore/story/background, /action  narrative steps
  /explore/complete                   completion step
  /records                            record list
  /records/[id]                       record detail/edit
  /records/analysis                   stats & charts
  /account                            profile settings

/auth/sign-in | sign-up | sign-out    WorkOS redirects
/api/records                          POST (create), GET (list, paginated)
/api/records/[id]                     PUT (update), DELETE
/api/records/analysis                 GET stats/analysis
/api/user                             GET profile
/api/auth/callback                    WorkOS OAuth callback
```

### State management

Zustand (`src/store/exploreStore.ts`) holds the multi-step explore flow state, hydrated via `ExploreStoreHydrator.tsx`. Records list/query/search logic lives in `src/lib/records-*.ts`.

### Styling

Brand accent color is `#3C9DAE`, exposed as the `--color-main` token in `globals.css` — always use the `text-main` utility class, never raw hex. Dark mode uses Tailwind `class` strategy via next-themes.

Do not add `text-[...]` arbitrary values, `text-md`, or raw brand hex colors. Use the semantic typography classes defined in `src/app/globals.css` (`.type-body`, `.type-caption`, `.type-button`, etc.); `.project/style.md` documents the palette.

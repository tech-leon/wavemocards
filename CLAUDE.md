# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## Repository conventions

- Use English for code and comments. Plans should be written in Traditional Chinese.
- Do not use Simplified Chinese anywhere.
- Use pnpm to manage packages — never npm.
- The `middleware` file convention is deprecated — `src/proxy.ts` fills that role.
- Reference `.project/tech.md` and `.project/style.md` for tech stack and style decisions, and `.project/backlog.md` for known outstanding work.
- The design system lives in `DESIGN.md` (visual spec) and `PRODUCT.md` (strategy); `.project/style.md` is the quick reference. Follow them for any UI work.
- **Plan**: Write your plan in Traditional Chinese.
- **Memories**: You manage your own memory. Record and update it to ensure that essential information is not forgotten across different sessions, and unnecessary memories can be deleted. DO NOT ask "Do you want to add xxx memory?"

## Commands

```bash
pnpm dev               # Start dev server
pnpm build             # Production build
pnpm lint              # ESLint
pnpm validate:cards    # Validate card/category translations across all 3 locales
```

No test runner yet — when adding tests, set up vitest first (see `.project/tech-debt-2026-06.md` Phase 3).

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

Each `(auth)/explore/.../page.tsx` is a thin route wrapper; its UI lives in a sibling `*Content.tsx` under `src/app/explore/` (e.g. `ExploreCardsContent.tsx`). The two trees are not a route conflict — only the `(auth)` tree has `page.tsx` files.

### API input validation

All API route handlers validate request bodies at the trust boundary before any DB write:
- Range-check numeric inputs (e.g. emotion levels must be 1–10).
- Cap free-text field length before insert.
- Reject malformed shapes with a 400 and a translated `apiErrors.*` message.

`src/app/api/user/route.ts` (PUT) is the reference implementation.

### State management

Zustand (`src/store/exploreStore.ts`) holds the multi-step explore flow state, hydrated via `ExploreStoreHydrator.tsx`. Records list/query/search logic lives in `src/lib/records-*.ts`.

### Styling

The full design system is documented in `DESIGN.md` (tokens are normative in `src/app/globals.css`). Hard rules:

- Brand accent is `#3C9DAE`, exposed as `--color-main` — always use token utilities (`text-main`, `bg-pink`, `bg-happy`), never raw hex or arbitrary color values.
- Light/dark theming goes through semantic tokens (`bg-background`, `text-foreground`, `bg-muted`, `text-muted-foreground`, `border-border`, `border-input`). Never hand-pair `gray-*` with `dark:gray-*`. Only the custom gray ramp is allowed as neutrals (no slate/zinc/stone). Dark mode uses Tailwind `class` strategy via next-themes.
- Font sizes only via the semantic typography classes in `globals.css` (`.type-body`, `.type-caption`, etc.) — no `text-md`, no Tailwind size utilities, no arbitrary sizes.
- Primary actions use the `Button` component's brand variants (`main`, `main-outline`, `pink`, `pink-outline`); do not hand-roll pill buttons. Confirmation dialogs compose `ConfirmModal`.
- Emotion category colors (and their `-dark` border shades) are reserved for emotion cards, category buttons, and charts; chart code reads them from `emotionCategoryColors` in `emotion-card-config.ts`.

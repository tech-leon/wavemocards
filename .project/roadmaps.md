# Roadmaps

This is a research-then-implement document for continuously improving the Wave Emotion Cards application.

## Research

### Usage instrumentation (do first — later research depends on this data)

- **Question**: The app currently records no usage data, but the flow research below needs our own funnel/retention numbers, and data only starts accumulating once collection is on. How do we collect it with minimal effort and zero privacy risk?
- **Findings** (2026-07-09, from Vercel official docs):
  - Retention/frequency needs no new instrumentation: `emotion_records` timestamps already give per-user recording frequency, intervals, and sustained use.
  - The explore flow's steps are separate routes (`/explore/cards` → `/explore/strength/1` → … → `/explore/complete`), so route-level pageviews alone form a step-by-step drop-off funnel.
  - Vercel Web Analytics Hobby plan: free within 50,000 events/month (collection pauses beyond that, no billing), 1-month reporting window, no custom events. Cookieless and anonymised — fits a mental-health app; no cookie banner needed.
  - The 1-month window is not a hard loss: data can be exported via dashboard CSV (250 entries/panel) or the Web Analytics REST API (`visits/aggregate` by day + route, queryable within the reporting window), so a periodic pull can persist history ourselves. Exported data is aggregate counts only — no personal data.
  - Custom events (e.g. "picked a card but didn't proceed") require Pro; defer until the pageview funnel shows where to look. Alternative at that point: an anonymous events table in Supabase.
- **Decision**: Use Vercel Web Analytics (free tier) for the funnel + derive retention from `emotion_records` + a periodic API pull to keep history. Never log record content (which card, what was written) — only step progression. → Implements below.

### i18n full-scenario verification

- **Question**: Do all locale-routing scenarios behave correctly? Public pages get locale prefix, private pages never do, signed-in users keep their `locale_preference`, switching language syncs cookie + DB, and card content renders in all of zh-TW / en / ja.
- **Findings**: (pending)
- **Decision**: (pending) — broken scenarios become Implements items below.

### Evidence-based emotion-recording flow (literature review)

Is the current explore flow the right shape for users from junior-high students to adults — lowest friction, sustained use, and genuinely helping people understand and record their emotions? Split into three answerable questions:

- **Question 1 — Flow length vs adherence**: The explore flow is ~6–7 steps (cards → strength → story background → action → complete). What does EMA (ecological momentary assessment) / mood-tracking-app literature say about recording burden vs long-term adherence? Combine with our own funnel data (how many users enter explore vs reach complete, and where they drop off) — papers answer "what works", only our data answers "where our users get stuck".
- **Question 2 — Efficacy basis of card selection**: Does affect-labelling / emotional-granularity research (Lieberman, Feldman Barrett, etc.) support "pick a card + name the emotion" as the core mechanic, and does it suggest ways to make it more effective?
- **Question 3 — Separate journal vs simplified flow**: Should we add an Apple Journal-style lightweight daily journal as a separate feature, or simplify the existing emotion-record flow? Start from expressive-writing research (Pennebaker); literature leans toward "quick log by default, deep writing as opt-in" progressive designs — verify and decide.
- **Findings**: (pending)
- **Decision**: (pending)

## Deferred (not yet researched)

- **Export records for counsellors / therapists**: long-term positioning idea — let users share their emotion-record history with a counsellor or psychologist. Deliberately out of scope until the flow-evidence research above is done. Prerequisites before considering: (1) Questions 1–3 decided and the resulting flow changes shipped, so exported records reflect the flow we intend to keep; (2) funnel/retention data shows users actually sustain recording (an export of a near-empty history helps no one); (3) privacy/consent design for sharing sensitive mental-health data reviewed. Revisit after those land.

## Implements

- [ ] **Enable Vercel Web Analytics**: add `@vercel/analytics` and enable it in the Vercel dashboard. Pageviews only — no custom events, no content logging.
- [ ] **Analytics storage migration**: new table `analytics_route_daily` (day, route, pageviews, visitors, `unique(day, route)` so re-runs upsert). Aggregate counts only — no personal data. Service-role write only, no public RLS access. Lives next to `emotion_records` so funnel and retention stats can be queried together in SQL.
- [ ] **Periodic analytics export**: small script hitting the Web Analytics REST API (`visits/aggregate` grouped by day + route), upserting into `analytics_route_daily` before data falls out of the 1-month Hobby window. Weekly cadence is enough (a missed week has a month of buffer).
- [ ] **Retention queries from `emotion_records`**: derive per-user recording frequency, intervals, and sustained-use stats from existing timestamps to feed flow-research Question 1.

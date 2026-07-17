-- ============================================
-- Analytics daily route aggregates
-- ============================================
-- Persists Vercel Web Analytics aggregates beyond the 1-month
-- Hobby reporting window (see .research/roadmaps.md, usage
-- instrumentation). Aggregate counts only — no personal data,
-- no record content.
--
-- Written exclusively by the weekly export cron
-- (/api/analytics/export) via the service-role client. RLS is
-- enabled with NO policies: anon and user-scoped clients get no
-- access at all; the service role bypasses RLS.

CREATE TABLE analytics_route_daily (
    day date NOT NULL,
    route text NOT NULL,
    pageviews integer NOT NULL DEFAULT 0,
    visitors integer NOT NULL DEFAULT 0,
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (day, route)
);

ALTER TABLE analytics_route_daily ENABLE ROW LEVEL SECURITY;

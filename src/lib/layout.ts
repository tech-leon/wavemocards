// Tracks the real Header height via --header-height (kept in sync by a
// ResizeObserver in Header.tsx), so sticky elements stay flush under the
// Header even when the nav wraps taller in some locales.
export const AUTH_STICKY_TOP = 'top-(--header-height)';

// Sticky page-title wrapper: pins the title bar just below the Header on
// scroll, with the same translucent blur treatment as the Header. Nest a
// PAGE_CONTAINER child inside it so the title aligns with page content.
export const STICKY_TITLE_BAR = `sticky ${AUTH_STICKY_TOP} z-30 pb-1 bg-background/75 backdrop-blur-sm`;

// Shared horizontal geometry for page content. Mirrors the Header's
// wrapper (max-w-7xl + gutters) so content edges align with the nav at
// every viewport. Tailwind's bare `container` tracks the current
// breakpoint, which leaves zero side margin on most screens — don't use
// it for page content.
export const PAGE_CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

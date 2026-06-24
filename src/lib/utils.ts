import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The design system replaces Tailwind's text-size utilities with custom
// `.type-*` typography classes (see globals.css). They are mutually exclusive
// font-role classes, so register them as one conflict group. Otherwise
// tailwind-merge cannot tell that a className's `type-button-lg` should
// override a component base's `type-button`: both survive in the DOM and the
// winner is decided by stylesheet source order, which is silently fragile.
// `type-card-display-hover` is intentionally excluded — it pairs with a base
// size on hover rather than replacing it.
const twMerge = extendTailwindMerge<"type-scale">({
  extend: {
    classGroups: {
      "type-scale": [
        "type-page-title",
        "type-section-title",
        "type-subsection-title",
        "type-identity",
        "type-body-lg",
        "type-body",
        "type-body-sm",
        "type-caption",
        "type-button",
        "type-button-lg",
        "type-hero-display",
        "type-hero-cta",
        "type-card-display",
        "type-modal-display",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

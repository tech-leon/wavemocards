import { describe, it, expect } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("lets a later .type-* class override an earlier one (design-system typography)", () => {
    // The reason cn extends tailwind-merge: a Button base sets `type-button`
    // and a call site overrides with `type-button-lg` — only the latter should win.
    expect(cn("type-button", "type-button-lg")).toBe("type-button-lg")
    expect(cn("type-body", "type-hero-cta")).toBe("type-hero-cta")
  })

  it("still resolves standard Tailwind conflicts (last wins)", () => {
    expect(cn("px-4 py-2", "px-6 py-1.5")).toBe("px-6 py-1.5")
    expect(cn("h-9", "h-auto")).toBe("h-auto")
  })

  it("keeps non-conflicting classes", () => {
    expect(cn("type-button", "rounded-full bg-main")).toBe(
      "type-button rounded-full bg-main"
    )
  })
})

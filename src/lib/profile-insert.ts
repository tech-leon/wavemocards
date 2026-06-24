import type { ProfileInsert } from "@/types/database";

/**
 * Build a profiles insert row for a WorkOS user.
 * Single source of truth so every profile-creation path writes the same field set.
 * Lives outside profile.ts because that module is "use server" (exports must be async).
 */
export function buildProfileInsert(user: {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}): ProfileInsert {
  return {
    workos_user_id: user.id,
    email: user.email,
    locale_preference: "zh-TW",
    first_name: user.firstName,
    last_name: user.lastName,
  };
}

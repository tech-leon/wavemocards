"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";

/**
 * Get the current authenticated user
 */
export async function getUser() {
  try {
    const { user } = await withAuth();

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
    };
  } catch {
    // User is not authenticated
    return null;
  }
}

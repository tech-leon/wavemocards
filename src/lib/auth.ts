"use server";

import {
  signOut as workosSignOut,
  getSignInUrl,
  getSignUpUrl,
  withAuth,
} from "@workos-inc/authkit-nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Server action to sign out the user.
 */
export async function handleSignOut() {
  const headersList = await headers();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  const forwardedProto = headersList.get("x-forwarded-proto");
  const forwardedHost = headersList.get("x-forwarded-host");
  const host = forwardedHost || headersList.get("host") || "localhost:3000";
  const protocol = forwardedProto || "http";
  const returnTo = appUrl ? new URL(appUrl).origin : `${protocol}://${host}`;

  await workosSignOut({ returnTo });
}

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

/**
 * Server action to redirect the user to the WorkOS sign-in page.
 */
export async function handleSignIn() {
  const signInUrl = await getSignInUrl();
  redirect(signInUrl);
}

/**
 * Redirect unauthenticated users to the WorkOS sign-in page.
 * Use this in server components that require authentication.
 */
export async function redirectToSignIn(): Promise<never> {
  const signInUrl = await getSignInUrl();
  redirect(signInUrl);
}

/**
 * Server action to redirect the user to the WorkOS sign-up page.
 */
export async function handleSignUp() {
  const signUpUrl = await getSignUpUrl();
  redirect(signUpUrl);
}

/**
 * Get the sign-in URL
 */
export async function getAuthUrl() {
  const signInUrl = await getSignInUrl();
  return signInUrl;
}

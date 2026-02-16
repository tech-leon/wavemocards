"use server";

import { createServerClient } from "@/lib/supabase";
import { withAuth } from "@workos-inc/authkit-nextjs";
import type { Profile, ProfileUpdate } from "@/types/database";

// Re-export the Profile type for convenience
export type UserProfile = Profile;

/**
 * Sync the WorkOS user with Supabase profiles table.
 * Creates a new profile if it doesn't exist, or returns the existing one.
 */
export async function syncUserProfile(): Promise<UserProfile | null> {
  const { user } = await withAuth();

  if (!user) {
    return null;
  }

  const supabase = createServerClient();
  if (!supabase) {
    console.warn("Supabase not configured");
    return null;
  }

  // Check if profile already exists
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("workos_user_id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 means no rows returned, which is expected for new users
    console.error("Error fetching profile:", fetchError);
    return null;
  }

  if (existingProfile) {
    // Update last login or any changed info
    const { data: updatedProfile, error: updateError } = await supabase!
      .from("profiles")
      .update({
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        updated_at: new Date().toISOString(),
      })
      .eq("workos_user_id", user.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating profile:", updateError);
      return existingProfile;
    }

    return updatedProfile;
  }

  // Create new profile for first-time users
  const { data: newProfile, error: insertError } = await supabase!
    .from("profiles")
    .insert({
      workos_user_id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Error creating profile:", insertError);
    return null;
  }

  return newProfile;
}

/**
 * Get the current user's profile from Supabase
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const { user } = await withAuth();

  if (!user) {
    return null;
  }

  const supabase = createServerClient();
  if (!supabase) {
    console.warn("Supabase not configured");
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("workos_user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return profile;
}

/**
 * Update the current user's profile
 */
export async function updateUserProfile(
  updates: Omit<ProfileUpdate, "id" | "workos_user_id" | "email" | "created_at" | "updated_at">
): Promise<UserProfile | null> {
  const { user } = await withAuth();

  if (!user) {
    return null;
  }

  const supabase = createServerClient();
  if (!supabase) {
    console.warn("Supabase not configured");
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("workos_user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating user profile:", error);
    return null;
  }

  return profile;
}

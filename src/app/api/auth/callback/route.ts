import { handleAuth } from "@workos-inc/authkit-nextjs";
import { syncUserProfile } from "@/lib/profile";

export const GET = handleAuth({
  returnPathname: "/",
  onSuccess: async () => {
    // Sync user profile with Supabase after successful authentication
    await syncUserProfile();
  },
});

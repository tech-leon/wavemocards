import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

export const config = {
  matcher: [
    "/",
    "/about-emotions",
    "/emo-cards",
    "/emo-cards/(.*)",
    "/account",
    "/account/(.*)",
    "/records",
    "/records/(.*)",
    "/explore",
    "/explore/(.*)",
    "/api/(.*)",
  ],
};

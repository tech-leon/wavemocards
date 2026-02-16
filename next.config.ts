import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security: Remove X-Powered-By header
  poweredByHeader: false,

  // Strict mode for React (catches potential issues)
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Supported image formats (avif for better compression)
    formats: ["image/avif", "image/webp"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

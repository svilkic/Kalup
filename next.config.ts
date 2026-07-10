import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Showcase builds (NEXT_PUBLIC_DEMO=1) land visitors straight on the configurator.
    // Temporary redirect on purpose: browsers won't cache it against client deploys.
    return process.env.NEXT_PUBLIC_DEMO === "1"
      ? [{ source: "/", destination: "/demo", permanent: false }]
      : [];
  },
};

export default nextConfig;

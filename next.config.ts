import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amanpurohit.com',
      },
    ],
  },
  /* config options here */
  // output: 'export',
};

export default nextConfig;

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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; frame-src 'self' docs.google.com drive.google.com; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
          },
          {
            key: "Content-Security-Policy",
            value: `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.github.com;
                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                img-src 'self' data: https://github.com https://raw.githubusercontent.com;
                connect-src 'self' https://api.github.com;
                frame-src 'self';
                font-src 'self' https://fonts.gstatic.com;
            `.replace(/\n/g, ""),
        },
        ]
      }
    ];
  },
  /* config options here */
  // output: 'export',
};

export default nextConfig;

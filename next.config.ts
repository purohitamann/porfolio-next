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
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.github.com https://www.gstatic.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob: https://github.com https://raw.githubusercontent.com https:;
              connect-src 'self' 
                https://api.github.com 
                https://firestore.googleapis.com 
                https://firebase.googleapis.com 
                https://securetoken.googleapis.com 
                https://identitytoolkit.googleapis.com
                wss://firestore.googleapis.com
                https://*.googleapis.com;
              frame-src 'self' docs.google.com drive.google.com;
              font-src 'self' https://fonts.gstatic.com;
              worker-src 'self' blob:;
              object-src 'none';
              base-uri 'self';
            `.replace(/\n/g, " ").replace(/\s+/g, " ").trim()
          }
        ]
      }
    ];
  },
  /* config options here */
  // output: 'export',
};

export default nextConfig;

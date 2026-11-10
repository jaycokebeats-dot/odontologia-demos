import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.dentisaludgroup.com.ar',
          },
        ],
        destination: 'https://dentisaludgroup.com.ar/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'dentisalud-demo.vercel.app',
          },
        ],
        destination: 'https://dentisaludgroup.com.ar/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'dentisalud-group.vercel.app',
          },
        ],
        destination: 'https://dentisaludgroup.com.ar/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

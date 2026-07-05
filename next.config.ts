import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neighborly-swordfish-847.convex.cloud',
        port: '',
      },
    ],
  },
};

export default nextConfig;

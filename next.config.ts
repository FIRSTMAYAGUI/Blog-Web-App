import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neighborly-swordfish-847.convex.cloud',
        port: '',
      },

      {
        protocol: 'https',
        hostname: 'laudable-warthog-971.convex.cloud',
        port: '',
      },
    ],
  },
};

export default nextConfig;

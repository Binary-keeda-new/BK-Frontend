import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",

  async redirects() {
    return [
      {
        source: '/user/tutorials',
        destination: '/tutorials',
        permanent: true,
      },
      {
        source: '/user/tutorials/:slug',
        destination: '/tutorials/:slug',
        permanent: true,
      },
      {
        source: '/resources/tutorials',
        destination: '/tutorials',
        permanent: true,
      },
      {
        source: '/resources/tutorials/:slug',
        destination: '/tutorials/:slug',
        permanent: true,
      }
    ];
  },

  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      }
    ],
    localPatterns: [
      {
        pathname: '/logo-final.png',
        // search intentionally omitted — allows any query string (?t=...)
      },
      {
        pathname: '/logo-isolated.png',
      },
    ],
  },

  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
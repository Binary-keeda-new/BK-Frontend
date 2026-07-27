import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",

  async redirects() {
    return [
      {
        source: '/tutorials',
        destination: '/user/tutorials',
        permanent: false,
      },
      {
        source: '/tutorials/:slug',
        destination: '/user/tutorials/:slug',
        permanent: false,
      },
      {
        source: '/resources/tutorials',
        destination: '/user/tutorials',
        permanent: false,
      },
      {
        source: '/resources/tutorials/:slug',
        destination: '/user/tutorials/:slug',
        permanent: false,
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
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",

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
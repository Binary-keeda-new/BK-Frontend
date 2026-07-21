import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",

  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
<<<<<<< HEAD
        protocol: "https",
        hostname: "upload.wikimedia.org",
=======
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
>>>>>>> origin/develop
      },
    ],
  },

  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
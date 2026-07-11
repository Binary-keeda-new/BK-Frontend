import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',

  poweredByHeader: false,

  images: {
    domains: ['upload.wikimedia.org'],
  },

  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
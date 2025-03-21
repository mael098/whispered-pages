

/**@type {import('next')} */

import { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    serverActions:{
      bodySizeLimit:'10mb'
    }
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

export default nextConfig;

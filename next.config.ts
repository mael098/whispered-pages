/**@type {import('next')} */

const nextConfig = {
  /* config options here */

  experimental: {
    serverActions: true,
  },
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

export default nextConfig;

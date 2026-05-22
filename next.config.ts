import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/snapmaker-store-clone",
  assetPrefix: "/snapmaker-store-clone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

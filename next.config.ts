import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/yoogletodo",
  assetPrefix: "/yoogletodo/",
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/リポジトリ名",
  assetPrefix: "/リポジトリ名/",
};

export default nextConfig;

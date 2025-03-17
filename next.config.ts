import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/yoogletodo",
  assetPrefix: "/yoogletodo/",
  reactStrictMode: true,
  trailingSlash: true
};

export default nextConfig;

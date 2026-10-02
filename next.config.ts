import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Utility-",
  assetPrefix: "/Utility-/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

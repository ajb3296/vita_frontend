import type { NextConfig } from "next";
// import { Configuration } from "@svgr/webpack";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;

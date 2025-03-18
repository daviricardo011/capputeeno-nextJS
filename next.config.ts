import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "down-br.img.susercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

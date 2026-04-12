import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', 
        'learning-management-system-exw.pages.dev'
      ],
    },
  },
};

export default nextConfig;
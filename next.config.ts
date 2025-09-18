import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MAINTENANCE_MODE: process.env.MAINTENANCE_MODE,
    MAINTENANCE_BYPASS_TOKEN: process.env.MAINTENANCE_BYPASS_TOKEN,
  },
};

export default nextConfig;

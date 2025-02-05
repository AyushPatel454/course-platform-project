import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next.js configuration options */
  experimental: {
    // Enable dynamic import() for IO operations to load code only when needed, improving performance.
    dynamicIO: true, 
    
    // Enable authentication interruption handling, allowing the app to handle auth-related events dynamically.
    authInterrupts: true, 
  }
};

export default nextConfig;

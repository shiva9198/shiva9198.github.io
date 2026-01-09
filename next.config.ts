import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Ensure Turbopack uses this repo folder as the workspace root
  turbopack: {
    root: './',
  },
  // Image optimization
  images: {
    unoptimized: true,
    domains: ['localhost', '127.0.0.1'],
    formats: ['image/webp', 'image/avif'],
  },
  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  // Note: headers and redirects are disabled for static export
  // They don't work with GitHub Pages static hosting
};

export default nextConfig;

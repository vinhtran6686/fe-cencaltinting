/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
    NEXT_PUBLIC_AUTH_ENABLED: process.env.NEXT_PUBLIC_AUTH_ENABLED,
    NEXT_PUBLIC_FEATURE_NOTIFICATIONS: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS,
  },
}

module.exports = nextConfig 
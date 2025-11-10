/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure proper output for Netlify
  output: 'standalone',
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreDuringBuilds: true,
  reactStrictMode: true,
  images: {
    domains: ["work-papa.onrender.com"],
  },
};

module.exports = nextConfig;

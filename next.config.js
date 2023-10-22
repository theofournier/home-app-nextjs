/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["images.unsplash.com", "image.tmdb.org"],
  },
};

module.exports = nextConfig;

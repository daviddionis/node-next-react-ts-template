/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "api.optimustours.com",
      "images.pexels.com",
      "images.unsplash.com",
      "a0.muscache.com",
      "www.gstatic.com",
      "cdn.worldvectorlogo.com"
    ],
  },
}

module.exports = nextConfig

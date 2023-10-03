/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = withContentlayer({ ...nextConfig });

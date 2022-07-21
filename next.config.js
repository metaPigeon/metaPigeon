/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = withContentlayer({
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "/",
  },
});

module.exports = nextConfig;

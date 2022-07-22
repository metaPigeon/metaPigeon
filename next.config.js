/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require("next-contentlayer");

const nextConfig = withContentlayer({
  reactStrictMode: true,
  // images: {
  //   loader: "imgix",
  //   path: "/",
  // },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blog",
        permanent: false,
      }
    ]
  },
});

module.exports = nextConfig;

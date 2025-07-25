/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gratisography.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

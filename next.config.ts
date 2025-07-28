/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.pvclasses.in",
        pathname: "/upload/**",
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

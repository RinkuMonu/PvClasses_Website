// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "api.pvclasses.in",
//         pathname: "/upload/**",
//       },

//       //   {
//       //   protocol: "http",
//       //   hostname: "localhost",
//       //   port: "3000", // optional, but good for clarity
//       //   pathname: "/upload/**",
//       // },
//       {
//         protocol: "https",
//         hostname: "gratisography.com",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;







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
        hostname: "cms.sevenunique.com",
        pathname: "//uploads/blogs/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/upload/**",
      }, // ✅ Add comma here
      {
        protocol: "https",
        hostname: "gratisography.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

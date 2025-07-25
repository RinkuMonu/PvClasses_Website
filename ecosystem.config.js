// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "next-dashboard-3002",
      script: "npm",
      args: "start",
      env: {
        PORT: 3002,
        NODE_ENV: "production"
      }
    }
  ]
};

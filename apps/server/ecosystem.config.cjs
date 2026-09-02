module.exports = {
  apps: [
    {
      name: "ecommerce-server",
      script: "./src/server.js",
      env: {
        PORT: 6000,
      }
    }
  ]
};

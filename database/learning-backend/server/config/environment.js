const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    database: {
      url: process.env.Database_url || "url here",
    },
    api: {
      key: process.env.API_Key || "API Key Here",
    },
    log: "debug",
    port: process.env.PORT || 5000,
  },
  testing: {
    database: {
      url: process.env.Database_url || "url here",
    },
    api: {
      key: process.env.API_Key || "API Key Here",
    },
    log: "info",
    port: process.env.PORT || 3000,
  },
  production: {
    database: {
      url: process.env.Database_url || "url here",
    },
    api: {
      key: process.env.API_Key || "API Key Here",
    },
    log: "error",
    port: process.env.PORT || 3000,
  },
};

const nodeEnv = process.env.NODE_ENV || "development";

module.exports = config[nodeEnv];

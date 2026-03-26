const mongoose = require("mongoose");
const envConfig = require("./environment");
const url = envConfig.database.url;

try {
  const db = async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  };

  module.exports = db;
} catch (err) {
  console.error("Database err");
  process.exit();
}

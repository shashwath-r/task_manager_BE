const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("[DB Connection] :: Connection Successful");
  } catch (error) {
    logger.error("[DB Connection] :: Connection Failed", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

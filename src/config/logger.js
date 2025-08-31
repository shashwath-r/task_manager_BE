// utils/logger.js
const { createLogger, format, transports } = require("winston");
const path = require("path");

const devFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }), // 👈 capture error stack
  format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `[${timestamp}] [${level}] ${message} - ${stack}`
      : `[${timestamp}] [${level}] ${message}`;
  })
);

const prodFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }), // 👈 important for prod too
  format.json()
);

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "info",
  format: process.env.NODE_ENV === "production" ? prodFormat : devFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
    }),
  ],
});

// Stream for morgan
logger.stream = {
  write: (message) => logger.http(message.trim()),
};

module.exports = logger;

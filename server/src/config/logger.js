// utils/logger.js
const { createLogger, format, transports } = require("winston");

const devFormat = format.combine(
  format.colorize(), // adds colors
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `[${timestamp}] [${level}] ${message} - ${stack}`
      : `[${timestamp}] [${level}] ${message}`;
  })
);

const prodFormat = format.combine(
  format.timestamp(),
  format.json() // JSON format for production
);

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "info",
  format: process.env.NODE_ENV === "production" ? prodFormat : devFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

// Stream for morgan
logger.stream = {
  write: (message) => logger.http(message.trim()),
};

module.exports = logger;

const logger = require("../config/logger");
const { stack } = require("../routes/auth.route");

const errorHandler = (err, req, res, next) => {
  logger.error("🔥 Error:", err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NOD_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };

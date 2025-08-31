const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { authRouter, taskRouter } = require("./src/routes");
const connectDB = require("./src/config/db");
const { errorHandler } = require("./src/middlewares/error.middleware");
const ApiError = require("./src/error/apiError");
const logger = require("./src/config/logger");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.use((req, res, next) => {
  next(new ApiError(`${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 7000;

const runServer = async () => {
  try {
    await connectDB(); // ensure DB is connected first
    app.listen(PORT, () => {
      logger.info(`🚀 App listening on port ${PORT}`);
    });
  } catch (err) {
    logger.error("❌ Failed to connect to DB", err.message);
    process.exit(1); // crash if DB connection fails
  }
};

runServer();

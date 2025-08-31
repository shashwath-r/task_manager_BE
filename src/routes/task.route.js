const express = require("express");
const protectedRoute = require("../middlewares/auth.middleware");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const validate = require("../middlewares/validate.middleware");
const { taskSchema } = require("../validators/tasks.validator");

const router = express.Router();

router.use(protectedRoute);

router.post("/", validate(taskSchema), createTask);
router.get("/", getTasks);

router.get("/:id", getTaskById);
router.put("/:id", validate(taskSchema), updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

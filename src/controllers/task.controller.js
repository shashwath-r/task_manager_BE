const Task = require("../models/task.model");
const asyncHandler = require("../utils/asyncHandler");

exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  const task = await Task.create({
    title,
    description,
    dueDate,
    status,
    createdBy: req.user._id,
  });
  res.status(201).json(task);
});

exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user._id });
  res.status(200).json(tasks);
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(200).json(task);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user._id,
    },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(200).json(task);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

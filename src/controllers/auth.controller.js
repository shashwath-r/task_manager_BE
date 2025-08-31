const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateTokens");
const asyncHandler = require("../utils/asyncHandler");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = generateToken(user._id);
  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid User email" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Password" });
  }
  const token = generateToken(user._id);

  res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

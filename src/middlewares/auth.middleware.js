const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No Token, authorization denied" });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User Not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Token Invalid" });
  }
};

module.exports = protectedRoute;

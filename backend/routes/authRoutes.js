import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30d",
  });
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// A route to seed the first admin user
router.post("/seed", async (req, res) => {
  const adminExists = await User.findOne({ username: "admin" });
  if (adminExists) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  const user = await User.create({
    username: "admin",
    password: "password123",
  });
  res.status(201).json({ message: "Admin created", username: user.username });
});

export default router;

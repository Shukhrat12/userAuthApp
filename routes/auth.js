import express from "express";

// router
const router = express.Router();

// import the user object from models
import User from "../models/User.js";

router.get("/register", (req, res) => {
  res.render("register");
});

// Route for user registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send("User already exists!");
  }

  // create a new user
  const user = new User({ username, password });

  await user.save();

  res.status(201).send("User registered successfully!");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// Route for user login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  // Check the username
  if (!user) {
    return res.status(400).send("Invalid username or password!");
  }

  // Check the password
  if (password !== user.password) {
    return res.status(400).send("Invalid username or password!");
  }

  res.send("Login successful!");
});

export default router;

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../module/User"); // Use capitalized naming for models

// =======================
// REGISTER ROUTE
// =======================
router.post("/authregister", async (req, res) => {
  const { name, email, password, contact, city, state } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contact,
      city,
      state
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// =======================
// LOGIN ROUTE
// =======================
router.post("/authlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Send only ID
    res.status(200).json({
      msg: "Login successful",
      id: user._id,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// =======================
// GET USER BY ID
// =======================
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found", data: null });
    }
    res.json({ success: true, message: "User found", data: user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, message: "Server error", data: null, error: err.message });
  }
});

module.exports = router;

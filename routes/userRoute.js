
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const Users = require("../module/User"); // Your User model

// POST /register → Register a new user (without password hashing)
router.post("/register", async (req, res) => {
  const { name, email, password, contact, city, state } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create user (password saved as plain text)
    const newUser = new Users({
      name,
      email,
      password, // plain text
      contact,
      city,
      state
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully", id: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// GET /user/:id → Get user data
router.get("/user/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Users = require("../module/User"); // ✅ Check folder name

// =======================
// REGISTER USER (with password hashing)
// =======================
router.post("/userregister", async (req, res) => {
  const { name, email, password, contact, city, state } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
      contact,
      city,
      state
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      id: newUser._id
    });
  } catch (err) {
    console.error("User registration error:", err);
    res.status(500).json({ success: false, msg: "Server error", error: err.message });
  }
});

// =======================
// GET USER BY ID
// =======================
router.get("/user/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, msg: "Server error", error: err.message });
  }
});

module.exports = router;

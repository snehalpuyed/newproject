const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const users = require("../module/User");

router.post("/authregister", async (req, res) => {
  const { name, email, password, contact, city, state } = req.body;

  try {
    // 🔍 Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Create new user document
    const newUser = new users({
      name,
      email,
      password: hashedPassword,
      contact,
      city,
      state
    });

    // 💾 Save to MongoDB
    await newUser.save();

    // ✅ Success response
    res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



// ✅ LOGIN ROUTE
router.post("/authlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Send only ID
    res.status(200).json({
      msg: "Login successful",
      id: user._id
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});
router.get("/authuser/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found", data: null });
    }
    res.json({ success: true, message: "User found", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", data: null, error: err.message });
  }
});





module.exports = router;

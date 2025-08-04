const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const users = require("../module/User");

// ✅ REGISTER ROUTE
router.post("/authregister", async (req, res) => {
  const { name, email, password, contact, city } = req.body;

  try {
    // Check if user already exists
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new users({
      name,
      email,
      password: hashedPassword,
      contact,
      city,
    });

    await newUser.save();

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

    // Send user info back (except password)
    res.status(200).json({
      msg: "Login successful",
      user: {
        name: user.name || "",
        email: user.email,
        contact: user.contact || "",
        city: user.city || ""
      }
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../module/User");

// ✅ CREATE: Register new user

router.post("/register", async (req, res) => {
  try {
    const { name, email, password,contact,city } = req.body;
    const newUser = await User.create({ name, email, password,contact,city});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});



// ✅ READ: Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // get all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // data to update
      { new: true } // return updated document
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// ✅ DELETE: Delete user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

router.get("/user/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                contact: user.contact,
                city: user.city
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


module.exports = router;
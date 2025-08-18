const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Users = require("../module/User"); // ✅ Check folder name
// =======================
// DELETE ALL USERS
// =======================
router.delete("/users", async (req, res) => {
  try {
    const result = await Users.deleteMany({});
    res.json({
      success: true,
      msg: "All users deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error("Delete all users error:", err);
    res.status(500).json({ success: false, msg: "Server error", error: err.message });
  }
});


module.exports = router;

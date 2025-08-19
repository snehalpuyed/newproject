const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // 👈 field ko required banaya
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,     // 👈 duplicate email na aaye
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6      // 👈 kam se kam 6 character
  },
  contact: {
    type: Number,
    
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

// =======================
// Pre-save middleware -> password hash automatically
// =======================
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next(); // agar password modify nahi hua to skip

    const salt = await bcrypt.genSalt(10); // salt generate
    this.password = await bcrypt.hash(this.password, salt); // password hash
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Users", userSchema);

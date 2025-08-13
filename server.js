const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000; // ✅ Use environment port for deployment

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/auth");
const videoUploadRoute = require("./routes/uploads");
const userRoutes = require("./routes/userRoute"); // ✅ removed extra dot

app.use("/api", authRoutes);
app.use("/api", videoUploadRoute);
app.use("/api", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 API is working fine");
});

// MongoDB connection
const mongoURL = process.env.MONGO_URI || "mongodb+srv://snehalpuyed:gold@cluster0.xrmmr63.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

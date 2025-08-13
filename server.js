const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();
const PORT = 8000;

// 1️⃣ Middlewares
app.use(cors());
app.use(express.json());  // Important: Must be above all routes

// 2️⃣ Connect to MongoDB
const mongoURL = "mongodb+srv://snehalpuyed:gold@cluster0.xrmmr63.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// 3️⃣ Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4️⃣ Mount Routes
const authroutes = require("./routes/auth");
const videoUploadRoute = require("./routes/uploads");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authroutes);         // register and login
app.use("/api/upload", videoUploadRoute); // video uploads
app.use("/api/users", userRoutes);        // user routes

// 5️⃣ Test route
app.get("/", (req, res) => {
  res.send("🚀 API is working fine");
});

// 6️⃣ Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

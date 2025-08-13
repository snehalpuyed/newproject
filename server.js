const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();
const PORT = 8000;

// ✅ 1. Middlewares first
app.use(cors());
app.use(express.json());  // ✅ Important: Must be above all routes

// ✅ 2. Connect to MongoDB
const mongoURL = "mongodb+srv://snehalpuyed:gold@cluster0.xrmmr63.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// ✅ 3. Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ 4. Mount Routes (do NOT duplicate the same file)
const authroutes = require("./routes/auth");
const videoUploadRoute = require("./routes/uploads");

app.use("/api", authroutes);         // register and login
app.use("/api", videoUploadRoute);   // video uploads


// ✅ 5. Test route
app.get("/", (req, res) => {
  res.send("🚀 API is working fine");
 

});

// ✅ 6. Start server
app.listen(7000, '0.0.0.0', () => console.log("Server running..."));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");

const app = express();

app.use(express.json());
app.use(cors());

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// 404 handler - after all routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// error handler - four parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
    .then(() => console.log("✓ MongoDB Connected Successfully"))
    .catch(err => {
        console.error("✗ MongoDB Connection Error:", err.message);
        process.exit(1);
    });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "Server Running on port 5000" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✓ Server started on http://localhost:${PORT}`);
});
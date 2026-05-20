const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Secret key for JWT (in production, use environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// REGISTER - Create a new user account
router.post("/register", async (req, res) => {
    try {
        // Validate input
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash password with 10 salt rounds
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User Registered Successfully", username: user.username });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});

// LOGIN - Authenticate user and return JWT token
router.post("/login", async (req, res) => {
    try {
        // Validate input
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Compare passwords
        const passwordValid = await bcrypt.compare(req.body.password, user.password);
        if (!passwordValid) {
            return res.status(401).json({ error: "Wrong password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login Successful", token, userId: user._id });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
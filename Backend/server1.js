const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. Middleware
app.use(express.json()); // Essential to read 'formData' from React
app.use(cors());         // Essential to allow React (3000) to talk to Node (5000)

// 2. Local MongoDB Connection
// 'authDB' is the name of the database that will be created
mongoose.connect('mongodb://127.0.0.1:27017/authDB')
  .then(() => console.log("✅ Connected to Local MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

// 3. User Schema (What a user looks like in the DB)
const userSchema = new mongoose.Schema({
  name: { type: String, required: false }, // Optional for login
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 4. Routes
// This matches your React fetch: 'http://localhost:5000/api/auth/signup'
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save to Database
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Add this to server.js
app.get('/', (req, res) => {
  res.send("The Backend Server is running and waiting for React!");
});

// For Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }); // Simple check (not for production)

  if (user) {
    res.json({ message: "Login successful!", token: "dummy-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
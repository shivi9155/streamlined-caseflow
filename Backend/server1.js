const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- 1. Middleware ---
app.use(express.json()); 
app.use(cors());         

// --- 2. Local MongoDB Connection ---
mongoose.connect('mongodb://127.0.0.1:27017/authDB')
  .then(() => console.log("✅ Connected to Local MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

// --- 3. Database Schemas & Models ---

// User Schema (Auth)
const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Case Schema (Case Management)
const caseSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true }, // Changed: required instead of default
  plaintiff: { type: String, required: true },
  defendant: { type: String, required: true },
  filedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  nextHearing: { type: String, default: null }
});
const Case = mongoose.model('Case', caseSchema);

// --- 4. Routes ---

app.get('/', (req, res) => {
  res.send("The Backend Server is running and waiting for React!");
});

/** AUTH ROUTES **/
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: "Login successful!", token: "dummy-jwt-token" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/** CASE MANAGEMENT ROUTES **/

// Create a new case
app.post('/api/cases/create', async (req, res) => {
  try {
    // Destructured 'status' from req.body so it can be saved
    const { title, category, priority, status, plaintiff, defendant } = req.body;

    const prefixes = { 'CMI': 'CTV', 'Criminal': 'CRV', 'Family': 'FAW', 'Commercial': 'TCM', 'Civil': 'CIV' };
    const prefix = prefixes[category] || 'CAS';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const caseNumber = `${prefix}/${year}/${randomNum}`;

    const newCase = new Case({
      caseNumber,
      title,
      category,
      priority,
      status, // Now saves the status selected in the React Modal
      plaintiff,
      defendant
    });

    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(500).json({ message: "Error saving case", error: error.message });
  }
});
/** 1. DELETE A CASE (AND ITS PARTIES) **/
app.delete('/api/cases/:id', async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.json({ message: "Case and associated parties removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting case", error: error.message });
  }
});

/** 2. UPDATE PARTY DETAILS (Optional but Recommended) **/
// This allows you to update specific fields like phone or email
app.put('/api/cases/:id', async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // returns the updated document
    );
    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: "Error updating case details", error: error.message });
  }
});

// Fetch all cases
app.get('/api/cases', async (req, res) => {
  try {
    const allCases = await Case.find().sort({ filedDate: -1 });
    res.json(allCases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cases" });
  }
});

// --- 5. Start Server ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
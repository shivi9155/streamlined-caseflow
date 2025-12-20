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
  status: { type: String, required: true },
  plaintiff: { type: String, required: true },
  defendant: { type: String, required: true },
  filedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  nextHearing: { type: String, default: null }
});
const Case = mongoose.model('Case', caseSchema);

// Hearing Schema (For Schedule Page)
const hearingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  caseId: { type: String, required: true }, // Links to Case.caseNumber
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  judge: String,
  parties: [String], 
  caseType: String,
  priority: { type: String, default: 'Medium' },
  status: { type: String, default: 'Scheduled' },
  courtroom: String,
  description: String,
});
const Hearing = mongoose.model('Hearing', hearingSchema);

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

// Create Case
app.post('/api/cases/create', async (req, res) => {
  try {
    const { title, category, priority, status, plaintiff, defendant } = req.body;
    const prefixes = { 'CMI': 'CTV', 'Criminal': 'CRV', 'Family': 'FAW', 'Commercial': 'TCM', 'Civil': 'CIV' };
    const prefix = prefixes[category] || 'CAS';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const caseNumber = `${prefix}/${year}/${randomNum}`;

    const newCase = new Case({
      caseNumber, title, category, priority, status, plaintiff, defendant
    });

    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(500).json({ message: "Error saving case", error: error.message });
  }
});

// --- NEW: Update Case (Save Changes) ---
app.put('/api/cases/:id', async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Returns the modified document instead of the original
    );
    if (!updatedCase) return res.status(404).json({ message: "Case not found" });
    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

// Delete Case
app.delete('/api/cases/:id', async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.json({ message: "Case removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Cases
app.get('/api/cases', async (req, res) => {
  try {
    const allCases = await Case.find().sort({ filedDate: -1 });
    res.json(allCases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cases" });
  }
});

/** HEARING/SCHEDULE ROUTES **/

app.get('/api/hearings', async (req, res) => {
  try {
    const hearings = await Hearing.find().sort({ start: 1 });
    res.json(hearings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hearings" });
  }
});

app.post('/api/hearings/create', async (req, res) => {
  try {
    const newHearing = new Hearing(req.body);
    const savedHearing = await newHearing.save();
    res.status(201).json(savedHearing);
  } catch (error) {
    res.status(500).json({ message: "Error scheduling hearing", error: error.message });
  }
});

app.delete('/api/hearings/:id', async (req, res) => {
  try {
    await Hearing.findByIdAndDelete(req.params.id);
    res.json({ message: "Hearing cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- 5. Start Server ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
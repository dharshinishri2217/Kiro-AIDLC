import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, age, gender, relation } = req.body;

    if (!name || !email || !password || !age || !gender || !relation)
      return res.status(400).json({ message: 'All fields are required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const today = new Date().toDateString();
    const user = await User.create({ name, email, password: hashed, age, gender, relation, lastVisit: today });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    // Update streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let streak = user.streak;
    if (user.lastVisit !== today) {
      streak = user.lastVisit === yesterday ? streak + 1 : 1;
      user.streak = streak;
      user.lastVisit = today;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

function sanitize(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    relation: user.relation,
    streak: user.streak,
    lastVisit: user.lastVisit,
    totalSims: user.totalSims,
  };
}

export default router;

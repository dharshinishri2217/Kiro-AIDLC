import express from 'express';
import User from '../models/User.js';
import SimulationLog from '../models/SimulationLog.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// POST /api/simulate  — log a completed simulation
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { selectedRoles, selectedTasks } = req.body;
    if (!selectedRoles?.length || !selectedTasks?.length)
      return res.status(400).json({ message: 'Roles and tasks are required' });

    // Save log
    await SimulationLog.create({
      userId: req.user.id,
      selectedRoles,
      selectedTasks,
      impactCount: selectedTasks.length,
    });

    // Increment user totalSims
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { totalSims: 1 } },
      { new: true }
    );

    res.json({ message: 'Simulation logged', totalSims: user.totalSims });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/simulate/history — get user's simulation history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const logs = await SimulationLog.find({ userId: req.user.id })
      .sort({ completedAt: -1 })
      .limit(10);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;

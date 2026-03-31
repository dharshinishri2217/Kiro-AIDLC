import mongoose from 'mongoose';

const simulationLogSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  selectedRoles: [{ type: String }],
  selectedTasks: [{ type: String }],
  impactCount:   { type: Number },
  completedAt:   { type: Date, default: Date.now },
});

export default mongoose.model('SimulationLog', simulationLogSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  age:      { type: Number, required: true },
  gender:   { type: String, required: true },
  relation: { type: String, required: true },
  streak:      { type: Number, default: 1 },
  lastVisit:   { type: String, default: '' },
  totalSims:   { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('User', userSchema);

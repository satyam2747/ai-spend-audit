import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  companyName: String,
  role: String,
  teamSize: Number,
  totalMonthlySavings: Number,
  auditPublicId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Lead', leadSchema);

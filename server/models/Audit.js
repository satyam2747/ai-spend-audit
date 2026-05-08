import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  publicId: { type: String, unique: true, required: true },
  tools: [{
    toolName: String,
    planId: String,
    seats: Number,
    monthlySpend: Number
  }],
  teamSize: Number,
  useCase: String,
  auditResults: [{
    toolName: String,
    currentSpend: Number,
    recommendation: String,
    monthlySaving: Number,
    annualSaving: Number,
    reason: String,
    status: String
  }],
  totalMonthlySavings: Number,
  totalAnnualSavings: Number,
  aiSummary: String,
  email: { type: String, select: false },
  companyName: { type: String, select: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Audit', auditSchema);

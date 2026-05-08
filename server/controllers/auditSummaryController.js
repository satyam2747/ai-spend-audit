import Audit from '../models/Audit.js';
import { generateSummary } from '../services/aiSummary.js';

export const createAuditSummary = async (req, res) => {
  try {
    const { publicId } = req.params;
    const audit = await Audit.findOne({ publicId });

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    // If summary already exists, return it
    if (audit.aiSummary) {
      return res.json({ summary: audit.aiSummary });
    }

    const summary = await generateSummary(audit);
    audit.aiSummary = summary;
    await audit.save();

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

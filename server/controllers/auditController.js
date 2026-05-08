import Audit from '../models/Audit.js';
import { nanoid } from 'nanoid';

export const createAudit = async (req, res) => {
  try {
    const publicId = nanoid(10);
    const auditData = {
      ...req.body,
      publicId
    };
    
    const audit = new Audit(auditData);
    await audit.save();
    
    res.status(201).json({ publicId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAudit = async (req, res) => {
  try {
    const audit = await Audit.findOne({ publicId: req.params.publicId });
    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }
    // Note: email and companyName are already hidden by "select: false" in schema
    res.json(audit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

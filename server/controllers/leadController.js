import Lead from '../models/Lead.js';
import Audit from '../models/Audit.js';
import { sendConfirmationEmail } from '../services/emailService.js';

export const createLead = async (req, res) => {
  try {
    const { email, auditPublicId } = req.body;
    
    const lead = await Lead.findOneAndUpdate(
      { email },
      req.body,
      { upsert: true, new: true }
    );

    // Send confirmation email in background
    if (auditPublicId) {
      Audit.findOne({ publicId: auditPublicId }).then(audit => {
        if (audit) {
          sendConfirmationEmail(email, audit);
        }
      });
    }
    
    res.status(201).json({ message: 'Lead captured successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

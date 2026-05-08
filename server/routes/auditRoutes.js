import express from 'express';
import { createAudit, getAudit } from '../controllers/auditController.js';
import { createAuditSummary } from '../controllers/auditSummaryController.js';

const router = express.Router();

router.post('/', createAudit);
router.get('/:publicId', getAudit);
router.post('/:publicId/summary', createAuditSummary);

export default router;

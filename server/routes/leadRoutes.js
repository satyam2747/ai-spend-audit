import express from 'express';
import { createLead } from '../controllers/leadController.js';
import { leadRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', leadRateLimiter, createLead);

export default router;

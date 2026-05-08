import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import auditRoutes from './routes/auditRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security & Middleware
app.use(helmet({
  contentSecurityPolicy: false, // For easier deployment of simple apps
}));
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.use('/api/audits', auditRoutes);
app.use('/api/leads', leadRoutes);

// Debug Route (Temporary)
app.get('/api/debug-env', (req, res) => {
  res.json({
    mongo: !!process.env.MONGO_URI,
    emailUser: !!process.env.EMAIL_USER,
    emailPass: !!process.env.EMAIL_PASS,
    anthropic: !!process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'your_key_here'
  });
});

// Production: Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'AI Spend Audit API Running' });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

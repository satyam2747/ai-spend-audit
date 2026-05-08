# AI Spend Audit 🚀

A production-ready web tool for startups to audit their AI tool spending (ChatGPT, Claude, Cursor, etc.). Built as an internship project for **Credex**.

## Features
- **Deterministic Audit Engine**: Intelligent logic to identify overspending and redundancies.
- **AI Insights**: Personalized analysis summaries generated via Anthropic Claude API.
- **Shareable Results**: Unique URLs for every audit (e.g., `/result/abc123xyz`).
- **Lead Capture**: Automated email notifications with PDF-style audit summaries.
- **Dark Theme**: Modern SaaS aesthetic using Tailwind CSS v4.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion (animations)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Security**: Helmet, Rate Limiting, CORS configuration

## Local Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Gmail account (for email service)
- Anthropic API Key (optional)

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd ai-spend-audit

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
ANTHROPIC_API_KEY=your_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

### 4. Running the App
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

## Deployment
- **Frontend**: Deploy to Vercel (add `VITE_API_URL` to env).
- **Backend**: Deploy to Render/Heroku (add all `.env` vars).
- **Database**: Use MongoDB Atlas (whitelist `0.0.0.0/0` or deployment IP).

Built with ❤️ by Satyam Yadav

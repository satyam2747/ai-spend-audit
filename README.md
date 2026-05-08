# AI Spend Audit 🚀

**AI Spend Audit** is a simple yet powerful tool built for startup founders to instantly see if they are overpaying for AI tools like ChatGPT, Claude, and Cursor.

This project was developed as a production-ready application for a startup internship assignment at **Credex**.

---

## 🔗 Live Links
- **Frontend (Web App):** [https://ai-spend-audit-chi.vercel.app/](https://ai-spend-audit-chi.vercel.app/)
- **Backend (API):** [https://ai-spend-audit-6inw.onrender.com/](https://ai-spend-audit-6inw.onrender.com/)

---

## ✨ Features
- **Smart Audit Engine:** Automatically detects if you're on the wrong plan or have redundant subscriptions.
- **AI-Powered Analysis:** Uses Anthropic's Claude API to generate a personalized executive summary of your savings.
- **Shareable Results:** Every audit generates a unique link (e.g., `/result/abc123xyz`) that you can share with your team.
- **Lead Capture & Automation:** Captures user interest and automatically sends a professional results email via Nodemailer.
- **Modern Design:** A clean, dark-themed interface built with Tailwind CSS.

---

## 🛠 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Mongoose).
- **AI:** Anthropic SDK (Claude-3 Haiku).
- **Email:** Nodemailer (Gmail SMTP).

---

## ⚙️ How It Works
1. **Input:** You select the tools your team currently uses and enter your seat count.
2. **Analysis:** Our engine applies specific rules:
   - Flags "Team/Enterprise" plans for small teams (1-3 users).
   - Identifies overlapping tools (like paying for both ChatGPT Plus and the OpenAI API).
   - Suggests switching to specialized tools like Cursor for coding teams.
3. **Output:** You get an instant dollar amount of monthly and annual savings.

---

## 🚀 Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/satyam2747/ai-spend-audit.git
cd ai-spend-audit
```

### 2. Install Dependencies
```bash
# Setup Backend
cd server
npm install

# Setup Frontend
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in the `/server` folder with your MongoDB URI, Email credentials, and Anthropic API Key.

### 4. Run the App
```bash
# Backend (from /server)
npm run dev

# Frontend (from /client)
npm run dev
```

---

Built with ❤️ by [Satyam Yadav](https://github.com/satyam2747)

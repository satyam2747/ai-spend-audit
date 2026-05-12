# Development Log

## Day 1: Project Scoping & Backend Architecture
- **Goal**: Define the core value proposition for "AI Spend Audit" and set up the MERN backend.
- **Progress**: 
  - Created Express server with `dotenv` configuration.
  - Set up MongoDB Atlas connection using Mongoose.
  - Defined `Audit` and `Lead` models.
  - Integrated Nodemailer for automated email results.

## Day 2: The Audit Engine & AI Integration
- **Goal**: Build the logic that actually calculates savings.
- **Progress**:
  - Wrote `auditEngine.js` with rules based on team size vs. tool plans (e.g., flagging ChatGPT Team for 1-user startups).
  - Integrated Anthropic's Claude-3 Haiku API in `services/aiSummary.js` to generate dynamic, personalized executive summaries based on the raw JSON audit data.

## Day 3: Frontend Development (React & Vite)
- **Goal**: Build a sleek, modern UI.
- **Progress**:
  - Initialized Vite + React app.
  - Set up Tailwind CSS with a dark navy/green "money-saving" aesthetic.
  - Built `HomePage.jsx` with the initial form.
  - Created `AuditPage.jsx` for selecting tools.

## Day 4: Results Dashboard & Refinements
- **Goal**: Connect frontend to backend and polish the results display.
- **Progress**:
  - Implemented `ResultPage.jsx` fetching data via unique audit ID.
  - Added "Share Link" functionality.
  - Polished responsive design.
  - Fixed a Vite favicon issue (updated to custom dollar sign).

## Day 5: Deployment & Security
- **Goal**: Ship to production.
- **Progress**:
  - Deployed Client to Vercel.
  - Deployed Server to Render.
  - Fixed GitHub Secret scanning alert (rotated MongoDB credentials and removed from history).
  - Updated README.md with live links.

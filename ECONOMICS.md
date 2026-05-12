# Unit Economics

This application is designed to be extremely lightweight and cheap to run, serving as an efficient lead-generation engine.

## Infrastructure Costs
- **Frontend Hosting**: Vercel (Hobby Tier) = $0 / month
- **Backend Hosting**: Render (Free Tier initially, then $7/mo Starter) = $0 - $7 / month
- **Database**: MongoDB Atlas (M0 Free Cluster) = $0 / month

## AI API Costs (Anthropic Claude-3 Haiku)
- **Input Tokens**: ~$0.25 / 1 Million tokens
- **Output Tokens**: ~$1.25 / 1 Million tokens
- **Cost per Audit**: 
  - Prompt length: ~100 tokens
  - Output length: ~150 tokens
  - Total cost per execution = ~$0.0002

## Email Costs
- **Nodemailer (Gmail SMTP)** = Free (up to 500 emails/day)

## Total Economics
- **Cost per Lead (CPL)**: Effectively $0.0002.
- **Scalability**: We can process 5,000 audits for exactly $1.00 in AI costs. 
- **ROI**: If used by a SaaS management company as a lead-gen tool, acquiring a B2B startup lead for fractions of a penny is highly profitable.

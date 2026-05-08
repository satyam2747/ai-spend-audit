import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (email, auditData) => {
  const { publicId, totalMonthlySavings, totalAnnualSavings } = auditData;
  const shareLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/result/${publicId}`;

  const mailOptions = {
    from: `"SpendAudit" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your AI Spend Audit Results 🚀',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #10b981;">Your Audit is Ready!</h2>
        <p>Thank you for using <strong>SpendAudit</strong>. We've analyzed your AI tool stack and found significant opportunities to save.</p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; color: #6b7280; text-transform: uppercase; font-size: 12px; font-weight: bold;">Potential Monthly Savings</p>
          <h1 style="margin: 5px 0; color: #10b981; font-size: 48px;">$${totalMonthlySavings}</h1>
          <p style="margin: 0; font-weight: bold;">$${totalAnnualSavings} per year</p>
        </div>

        <p>You can view and share your full breakdown here:</p>
        <a href="${shareLink}" style="display: inline-block; background: #10b981; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold;">View Full Audit</a>

        ${totalMonthlySavings > 500 ? `
          <div style="margin-top: 30px; padding: 15px; border-left: 4px solid #10b981; background: #ecfdf5;">
            <p style="margin: 0; font-weight: bold;">Big Savings Detected!</p>
            <p style="margin: 5px 0 0 0;">Your savings are substantial. The team at Credex can help you perform a full-stack optimization to maximize your runway.</p>
          </div>
        ` : ''}

        <p style="margin-top: 30px; color: #9ca3af; font-size: 12px;">
          Built for founders who ship.<br>
          SpendAudit.ai
        </p>
      </div>
    `,
  };

  try {
    console.log(`Attempting to send email to ${email}...`);
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email error: EMAIL_USER or EMAIL_PASS is missing in environment variables');
      return;
    }
    await transporter.sendMail(mailOptions);
    console.log(`✅ Success! Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('❌ Email Service Error Detail:', error);
  }
};

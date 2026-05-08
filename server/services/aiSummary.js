import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const generateSummary = async (auditData) => {
  const { teamSize, totalMonthlySavings, auditResults, useCase, totalAnnualSavings } = auditData;
  
  // Sort to find top 2 overspending tools
  const topOverspending = [...auditResults]
    .filter(r => r.status === 'overspending' || r.status === 'redundant')
    .sort((a, b) => b.monthlySaving - a.monthlySaving)
    .slice(0, 2);

  const topTool = topOverspending[0]?.toolName || 'AI stack';
  const secondTool = topOverspending[1]?.toolName || 'subscription';

  try {
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_key_here') {
      throw new Error('No API Key');
    }

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [{ 
        role: "user", 
        content: `Generate a concise (100 words) personalized AI spend audit summary for a startup founder.
        Team Size: ${teamSize}
        Primary Use Case: ${useCase}
        Total Monthly Savings Found: $${totalMonthlySavings}
        Top tools to optimize: ${topTool} and ${secondTool}.
        Tone: Professional, expert, and direct. Focus on "runway" and "efficiency".`
      }],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('AI Summary Generation Error:', error.message);
    
    // Fallback template
    return `Based on your audit, your team of ${teamSize} is currently overspending on your AI stack. Our analysis found $${totalMonthlySavings}/month in potential savings by optimizing your ${topTool} subscription and reviewing your ${secondTool} usage. Switching to recommended plans could save your team $${totalAnnualSavings} annually, effectively extending your runway.`;
  }
};

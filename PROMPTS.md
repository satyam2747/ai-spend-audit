# AI Prompts Used

This document outlines the system prompts and context structures sent to Anthropic's Claude API.

## Executive Summary Generator

**File:** `server/services/aiSummary.js`
**Model:** `claude-3-haiku-20240307`

### Prompt Structure
We use a dynamic prompt injected with the calculated results from our audit engine.

\`\`\`javascript
const prompt = \`Generate a concise (100 words) personalized AI spend audit summary for a startup founder.
Team Size: \${teamSize}
Primary Use Case: \${useCase}
Total Monthly Savings Found: $\${totalMonthlySavings}
Top tools to optimize: \${topTool} and \${secondTool}.
Tone: Professional, expert, and direct. Focus on "runway" and "efficiency".\`
\`\`\`

### Example Output
> "Based on your team size of 5 focused on software development, you are currently burning capital on redundant AI tools. We identified $150 in monthly savings. By consolidating your overlapping ChatGPT Plus and Claude Pro subscriptions, and shifting your developers to Cursor, you eliminate redundant compute costs. Optimizing these two subscriptions alone extends your annual runway by $1,800. Streamline your stack today to maximize efficiency without sacrificing capability."

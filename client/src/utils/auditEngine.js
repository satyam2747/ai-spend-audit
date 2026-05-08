import { TOOLS_DATA } from '../data/toolsData';

export const runAudit = (toolsSelected, teamSize, useCase) => {
  let results = [];
  let totalMonthlySavings = 0;

  // 1. Map selected tools to their data
  const processedTools = toolsSelected.map(selected => {
    const toolInfo = TOOLS_DATA.find(t => t.id === selected.toolId);
    const planInfo = toolInfo?.plans.find(p => p.id === selected.planId);
    return { ...selected, toolInfo, planInfo };
  });

  // 2. Run Rules
  processedTools.forEach(tool => {
    let rec = {
      toolName: tool.toolInfo.name,
      currentSpend: tool.monthlySpend || (tool.planInfo.price * tool.seats),
      recommendation: "Your spending is optimal.",
      monthlySaving: 0,
      reason: "Great job! You are using the right plan for your team size.",
      status: "optimal"
    };

    const isExpensivePlan = ['team', 'enterprise', 'business'].includes(tool.planId);
    
    // RULE 1: Team size 1-3 on Team/Enterprise = overkill
    if (teamSize <= 3 && isExpensivePlan) {
      const cheaperPlan = tool.toolInfo.plans.find(p => p.price < tool.planInfo.price && p.price > 0) || tool.toolInfo.plans[0];
      if (cheaperPlan && cheaperPlan.id !== tool.planId) {
        const potentialSpend = cheaperPlan.price * tool.seats;
        rec.monthlySaving = rec.currentSpend - potentialSpend;
        rec.recommendation = `Switch to ${cheaperPlan.name} plan.`;
        rec.reason = `For teams under 3, the ${tool.planInfo.name} features are usually not worth the ${tool.toolInfo.emoji} premium.`;
        rec.status = "overspending";
      }
    }

    // RULE 4: Per seat cost higher than plan price by 20%
    const expectedSpend = tool.planInfo.price * tool.seats;
    if (rec.currentSpend > expectedSpend * 1.2 && rec.status === "optimal") {
      rec.monthlySaving = rec.currentSpend - expectedSpend;
      rec.recommendation = "Review individual seat assignments.";
      rec.reason = "Your actual spend is significantly higher than the plan base price. You might have ghost seats.";
      rec.status = "overspending";
    }

    // RULE 2: Redundancy (Consumer App + API from same vendor)
    if (tool.toolId === 'chatgpt' && processedTools.some(t => t.toolId === 'openai_api')) {
      rec.status = "redundant";
      rec.recommendation = "Consolidate OpenAI spend.";
      rec.reason = "You are paying for both ChatGPT and API usage. Consider if all users need a ChatGPT Plus seat.";
    }
    if (tool.toolId === 'claude' && processedTools.some(t => t.toolId === 'anthropic_api')) {
      rec.status = "redundant";
      rec.recommendation = "Consolidate Anthropic spend.";
      rec.reason = "Redundant spend across Claude App and API detected.";
    }

    rec.annualSaving = rec.monthlySaving * 12;
    totalMonthlySavings += rec.monthlySaving;
    results.push(rec);
  });

  // RULE 3: Coding use case without Cursor
  const isCoding = useCase === 'coding';
  const hasCursor = processedTools.some(t => t.toolId === 'cursor');
  const hasExpensiveCodingTools = processedTools.some(t => (t.toolId === 'chatgpt' || t.toolId === 'claude') && teamSize > 2);

  if (isCoding && !hasCursor) {
    results.push({
      toolName: "Cursor IDE",
      currentSpend: 0,
      recommendation: "Adopt Cursor IDE",
      monthlySaving: 0,
      annualSaving: 0,
      reason: "For software teams, Cursor often replaces the need for separate ChatGPT/Claude seats for many developers.",
      status: "suggestion"
    });
  }

  return {
    results,
    totalMonthlySavings: Math.round(totalMonthlySavings),
    totalAnnualSavings: Math.round(totalMonthlySavings * 12),
    hasHighSavings: totalMonthlySavings > 500,
    hasLowSavings: totalMonthlySavings > 0 && totalMonthlySavings < 100
  };
};

// TEST CASE (To view in browser console)
const testSelected = [
  { toolId: 'chatgpt', planId: 'team', seats: 2, monthlySpend: 60 },
  { toolId: 'openai_api', planId: 'usage', seats: 1, monthlySpend: 50 }
];
console.log("--- AUDIT ENGINE TEST RUN ---");
console.log("Input:", { testSelected, teamSize: 2, useCase: 'coding' });
console.log("Output:", runAudit(testSelected, 2, 'coding'));

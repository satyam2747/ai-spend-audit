import { TOOLS_DATA } from '../data/toolsData.js';

/**
 * Runs a financial audit on selected AI tools based on team size and use case.
 * Implement 8 rules for financial credibility and entrepreneurial efficiency.
 * 
 * @param {Array} selectedTools - Array of { toolId, planId, seats, monthlySpend }
 * @param {number} teamSize - Number of users in the team
 * @param {string} useCase - Primary use case (coding, writing, data, etc.)
 * @returns {Object} Audit results and savings summary
 */
export const runAudit = (selectedTools = [], teamSize = 1, useCase = 'mixed') => {
  let results = [];
  let totalMonthlySavings = 0;

  // Helper to find tool and plan data
  const getToolData = (toolId) => TOOLS_DATA.find(t => t.id === toolId);
  const getPlanData = (tool, planId) => tool?.plans?.find(p => p.id === planId);

  // 1. Process existing tools with defensive checks
  const processedTools = (selectedTools || []).map(selected => {
    const toolInfo = getToolData(selected.toolId);
    const planInfo = getPlanData(toolInfo, selected.planId);
    return { ...selected, toolInfo, planInfo };
  });

  processedTools.forEach(tool => {
    // STEP 4: Defensive null checks for tool and plan lookups
    if (!tool.toolInfo || !tool.planInfo) {
      console.warn('Tool or plan not found:', { toolId: tool.toolId, planId: tool.planId });
      results.push({
        toolId: tool.toolId,
        toolName: tool.toolInfo?.name || tool.toolId || 'Unknown Tool',
        currentPlan: tool.planInfo?.name || tool.planId || 'Unknown Plan',
        currentSpend: tool.monthlySpend || 0,
        recommendedPlan: 'N/A',
        recommendation: "Data mismatch detected",
        monthlySaving: 0,
        annualSaving: 0,
        reason: `Could not find exact data for ${tool.toolId}/${tool.planId} in the database. Please verify selection.`,
        status: "optimal"
      });
      return;
    }

    const { toolInfo, planInfo, seats = 1, monthlySpend, toolId, planId } = tool;
    
    // Initialize result (Rule 8)
    let result = {
      toolId,
      toolName: toolInfo.name,
      currentPlan: planInfo.name,
      currentSpend: monthlySpend || (planInfo.pricePerUser * seats),
      recommendedPlan: planInfo.name,
      recommendation: "Maintain current plan",
      monthlySaving: 0,
      annualSaving: 0,
      reason: "You're spending well on this tool",
      status: "optimal"
    };

    const perSeatCost = result.currentSpend / seats;

    // RULE 1 — Small team on large plan
    const isTeamOrEnterprise = ['team', 'enterprise', 'business', 'teams'].includes(planId);
    if (teamSize <= 3 && isTeamOrEnterprise) {
      const individualPlan = toolInfo.plans?.find(p => ['plus', 'pro', 'individual', 'hobby', 'free'].includes(p.id));
      if (individualPlan && individualPlan.id !== planId) {
        result.recommendedPlan = individualPlan.name;
        result.monthlySaving = (planInfo.pricePerUser - individualPlan.pricePerUser) * seats;
        result.recommendation = `Downgrade to ${individualPlan.name}`;
        result.reason = "Team plan requires minimum users and adds overhead your team size doesn't justify";
        result.status = "overspending";
      }
    }

    // RULE 2 — Overpaying per seat
    if (result.status === "optimal" && perSeatCost > planInfo.pricePerUser * 1.15 && !planInfo.isUsageBased) {
      result.recommendation = "Verify seat count";
      result.reason = "Your per-seat cost exceeds the plan rate — you may have unused seats";
      result.status = "overspending";
      result.monthlySaving = Math.max(0, result.currentSpend - (planInfo.pricePerUser * seats));
    }

    // RULE 3 — Duplicate vendor subscriptions
    const hasTool = (id) => processedTools.some(p => p.toolId === id && p.toolInfo && p.planInfo);
    if (toolId === 'chatgpt' && hasTool('openai_api')) {
      result.status = "redundant";
      result.recommendation = "Review ChatGPT redundancy";
      result.reason = "API access gives you everything ChatGPT Plus does and more, at lower cost for technical teams";
    }
    if (toolId === 'claude' && hasTool('anthropic_api')) {
      result.status = "redundant";
      result.recommendation = "Review Claude redundancy";
      result.reason = "API access gives you everything Claude does and more, at lower cost for technical teams";
    }

    // RULE 5 — Claude Max overkill
    if (toolId === 'claude' && planId === 'max' && !['research', 'data'].includes(useCase)) {
      const proPlan = toolInfo.plans?.find(p => p.id === 'pro');
      if (proPlan) {
        result.monthlySaving = (planInfo.pricePerUser - proPlan.pricePerUser) * seats;
        result.recommendedPlan = proPlan.name;
        result.recommendation = `Downgrade to ${proPlan.name}`;
        result.reason = "Claude Max is designed for power users doing 5x+ normal usage. Most teams get full value from Pro";
        result.status = "overspending";
      }
    }

    // RULE 6 — GitHub Copilot Enterprise overkill
    if (toolId === 'github_copilot' && planId === 'enterprise' && teamSize < 50) {
      const businessPlan = toolInfo.plans?.find(p => p.id === 'business');
      if (businessPlan) {
        result.monthlySaving = (planInfo.pricePerUser - businessPlan.pricePerUser) * seats;
        result.recommendedPlan = businessPlan.name;
        result.recommendation = `Downgrade to ${businessPlan.name}`;
        result.reason = "Enterprise adds SAML SSO and policy controls — unnecessary below 50-person engineering teams";
        result.status = "overspending";
      }
    }

    result.monthlySaving = Math.max(0, result.monthlySaving);
    result.annualSaving = result.monthlySaving * 12;
    totalMonthlySavings += result.monthlySaving;
    results.push(result);
  });

  // RULE 4 — Overlapping coding tools
  const cursorResult = results.find(r => r.toolId === 'cursor' && r.status !== 'redundant');
  const copilotResult = results.find(r => r.toolId === 'github_copilot' && r.status !== 'redundant');
  
  if (cursorResult && copilotResult) {
    if (teamSize <= 5) {
      copilotResult.status = "overlapping";
      copilotResult.recommendation = "Consolidate to Cursor";
      copilotResult.reason = "Both tools serve autocomplete. Cursor Pro at $20 replaces Copilot Business at $19 with a better IDE experience";
      const additionalSaving = Math.max(0, copilotResult.currentSpend - copilotResult.monthlySaving);
      copilotResult.monthlySaving += additionalSaving;
      copilotResult.annualSaving = copilotResult.monthlySaving * 12;
      totalMonthlySavings += additionalSaving;
    } else {
      const expensive = cursorResult.currentSpend > copilotResult.currentSpend ? cursorResult : copilotResult;
      if (expensive.status === 'optimal') {
        expensive.status = "overlapping";
        expensive.recommendation = "Consolidate coding assistants";
        expensive.reason = "Paying for multiple AI code assistants. Compare team usage and consolidate to one vendor.";
      }
    }
  }

  // RULE 7 — Windsurf vs Cursor recommendation
  const hasCodingTool = processedTools.some(p => (p.toolId === 'cursor' || p.toolId === 'windsurf') && p.toolInfo);
  if (useCase === 'coding' && !hasCodingTool) {
    results.push({
      toolId: 'suggestion_coding',
      toolName: "AI Coding Assistant",
      currentPlan: "None",
      currentSpend: 0,
      recommendedPlan: "Windsurf Free / Cursor Hobby",
      recommendation: "Try a native AI IDE",
      monthlySaving: 0,
      annualSaving: 0,
      reason: "AI coding assistants reduce development time 20-30%. Both have free tiers worth trying immediately",
      status: "suggestion"
    });
  }

  return {
    results,
    totalMonthlySavings: Math.round(totalMonthlySavings),
    totalAnnualSavings: Math.round(totalMonthlySavings * 12),
    hasHighSavings: totalMonthlySavings > 500,
    hasLowSavings: totalMonthlySavings > 0 && totalMonthlySavings < 100,
    summary: totalMonthlySavings > 0 
      ? `Audit complete: Identified $${Math.round(totalMonthlySavings)} in monthly savings.` 
      : "Excellent! Your current AI stack is lean and financially optimal."
  };
};

# Pricing Data & Assumptions

Our `auditEngine.js` relies on current market pricing for major AI tools (as of mid-2024).

| Tool | Plan | Monthly Cost (USD) | Notes |
| :--- | :--- | :--- | :--- |
| **ChatGPT** | Plus | $20 / user | Standard individual plan. |
| **ChatGPT** | Team | $30 / user | Minimum 2 users required. Billed annually usually, but mapped to $30 for monthly comparison. |
| **Claude** | Pro | $20 / user | Comparable to ChatGPT Plus. |
| **Claude** | Team | $30 / user | Minimum 5 users required. |
| **Cursor** | Pro | $20 / user | IDE that includes access to GPT-4 and Claude 3.5 Sonnet. |
| **Midjourney** | Basic | $10 / user | |
| **Midjourney** | Pro | $60 / user | High volume usage. |
| **GitHub Copilot** | Individual | $10 / user | |
| **GitHub Copilot** | Business | $19 / user | |

## Optimization Rules
1. **The Solo Team Penalty**: If a user indicates a team size of 1, but is paying for a "Team" tier product (e.g., ChatGPT Team), they are overpaying by at least $10-$40/month.
2. **LLM Redundancy**: If a user pays for both ChatGPT Plus ($20) and Claude Pro ($20), they are usually overlapping capabilities. We suggest dropping one for $20/user savings.
3. **The Developer Stack**: If a user pays for GitHub Copilot ($10) + ChatGPT Plus ($20), they spend $30/user. Switching to Cursor Pro ($20) saves $10/user while providing a better integrated experience.

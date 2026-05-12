# Testing Strategy

Currently, testing for SpendAudit is handled via manual integration tests. Below are the core test cases validated before deployment.

## Core Test Cases

### 1. Solo Founder (1 Seat) Overpaying
- **Input**: Team Size = 1. Selects "ChatGPT Team".
- **Expected Outcome**: Engine flags as "overspending". Suggests downgrading to ChatGPT Plus. Calculates $10/month savings ($60 vs $50).

### 2. Redundant Subscriptions
- **Input**: Team Size = 3. Selects "ChatGPT Plus" and "Claude Pro".
- **Expected Outcome**: Engine flags one as "redundant". Suggests picking one primary LLM for the team. Calculates $60/month savings (3 users * $20).

### 3. Developer Workflows
- **Input**: Team Size = 5. Selects "ChatGPT Plus" for coding.
- **Expected Outcome**: Engine suggests switching to Cursor (which includes top-tier models) to avoid paying for an IDE plugin + web interface separately.

### 4. API Resilience (Anthropic)
- **Action**: Provide an invalid API key to the backend.
- **Expected Outcome**: The server catches the error and returns a hardcoded "Fallback Template" summary so the user experience is not broken, rather than crashing the app.

### 5. Email Delivery
- **Action**: Submit lead capture form with a valid email.
- **Expected Outcome**: Nodemailer sends an email containing the personalized savings breakdown.

## Future Plans
- Implement **Vitest** for unit testing the `auditEngine.js` rules.
- Implement **Playwright** for End-to-End browser testing of the critical user journey (Landing -> Audit -> Results).

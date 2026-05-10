export const USE_CASES = [
  { id: 'coding', name: 'Software Development' },
  { id: 'writing', name: 'Content & Writing' },
  { id: 'data', name: 'Data Analysis' },
  { id: 'research', name: 'Research' },
  { id: 'mixed', name: 'General/Mixed' }
];

export const TOOLS_DATA = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    emoji: '🤖',
    description: 'OpenAI\'s flagship conversational AI.',
    category: 'general',
    plans: [
      { id: 'plus', name: 'Plus', pricePerUser: 20, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['GPT-4o access', 'DALL-E', 'Data analysis'] },
      { id: 'team', name: 'Team', pricePerUser: 30, minUsers: 2, maxUsers: null, isUsageBased: false, features: ['Shared workspace', 'Admin console', 'Higher limits'] },
      { id: 'enterprise', name: 'Enterprise', pricePerUser: 60, minUsers: 10, maxUsers: null, isUsageBased: false, features: ['Unlimited GPT-4o', 'SSO', 'Advanced security'] },
      { id: 'api', name: 'API', pricePerUser: 0, minUsers: 1, maxUsers: null, isUsageBased: true, features: ['Direct model access', 'Usage-based pricing'] }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    emoji: '🧠',
    description: 'Anthropic\'s AI known for coding and reasoning.',
    category: 'general',
    plans: [
      { id: 'pro', name: 'Pro', pricePerUser: 20, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['Claude 3.5 Sonnet', 'Projects', 'High usage limits'] },
      { id: 'max', name: 'Max', pricePerUser: 100, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['5x usage of Pro', 'Priority access', 'Early features'] },
      { id: 'team', name: 'Team', pricePerUser: 30, minUsers: 5, maxUsers: null, isUsageBased: false, features: ['Shared projects', 'Admin controls', 'Higher rate limits'] },
      { id: 'enterprise', name: 'Enterprise', pricePerUser: 60, minUsers: 1, maxUsers: null, isUsageBased: false, features: ['SSO', 'Security auditing', 'Dedicated support'] },
      { id: 'api', name: 'API', pricePerUser: 0, minUsers: 1, maxUsers: null, isUsageBased: true, features: ['Direct model access', 'Usage-based pricing'] }
    ]
  },
  {
    id: 'cursor',
    name: 'Cursor',
    emoji: '🚀',
    description: 'AI-first code editor.',
    category: 'coding',
    plans: [
      { id: 'hobby', name: 'Hobby', pricePerUser: 0, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['Basic features', '2000 completions'] },
      { id: 'pro', name: 'Pro', pricePerUser: 20, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['Unlimited completions', '500 premium requests'] },
      { id: 'business', name: 'Business', pricePerUser: 40, minUsers: 1, maxUsers: null, isUsageBased: false, features: ['Team management', 'SSO', 'Privacy mode'] }
    ]
  },
  {
    id: 'github_copilot',
    name: 'GitHub Copilot',
    emoji: '💻',
    description: 'The world\'s most widely used AI developer tool.',
    category: 'coding',
    plans: [
      { id: 'individual', name: 'Individual', pricePerUser: 10, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['Code completion', 'Chat'] },
      { id: 'business', name: 'Business', pricePerUser: 19, minUsers: 1, maxUsers: null, isUsageBased: false, features: ['IP indemnity', 'Org management'] },
      { id: 'enterprise', name: 'Enterprise', pricePerUser: 39, minUsers: 1, maxUsers: null, isUsageBased: false, features: ['Custom models', 'Documentation search'] }
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    emoji: '♊',
    description: 'Google\'s most capable AI models.',
    category: 'general',
    plans: [
      { id: 'pro', name: 'Pro', pricePerUser: 20, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['1.5 Pro model', '2M token window'] },
      { id: 'ultra', name: 'Ultra', pricePerUser: 30, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['Most capable model', 'Advanced data analysis'] },
      { id: 'api', name: 'API', pricePerUser: 0, minUsers: 1, maxUsers: null, isUsageBased: true, features: ['Direct model access', 'Usage-based pricing'] }
    ]
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    emoji: '🔌',
    description: 'Direct access to GPT models via API.',
    category: 'api',
    plans: [
      { id: 'usage', name: 'Usage Based', pricePerUser: 0, minUsers: 1, maxUsers: null, isUsageBased: true, features: ['Pay-as-you-go', 'Fine-tuning'] }
    ]
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    emoji: '🔭',
    description: 'Direct access to Claude models via API.',
    category: 'api',
    plans: [
      { id: 'usage', name: 'Usage Based', pricePerUser: 0, minUsers: 1, maxUsers: null, isUsageBased: true, features: ['Pay-as-you-go', 'Prompt caching'] }
    ]
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    emoji: '🌊',
    description: 'Codeium\'s next-gen AI IDE.',
    category: 'coding',
    plans: [
      { id: 'free', name: 'Free', pricePerUser: 0, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['Basic features'] },
      { id: 'pro', name: 'Pro', pricePerUser: 15, minUsers: 1, maxUsers: 1, isUsageBased: false, features: ['Advanced features', 'Faster models'] },
      { id: 'teams', name: 'Teams', pricePerUser: 35, minUsers: 1, maxUsers: null, isUsageBased: false, features: ['Admin dashboard', 'SSO'] }
    ]
  }
];

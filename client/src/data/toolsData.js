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
    category: 'General AI',
    emoji: '🤖',
    description: 'OpenAI\'s flagship conversational AI.',
    plans: [
      { id: 'plus', name: 'Plus', price: 20, maxUsers: 1, features: ['GPT-4o access', 'DALL-E', 'Data analysis'] },
      { id: 'team', name: 'Team', price: 30, maxUsers: null, features: ['Shared workspace', 'Admin console', 'Higher limits'] },
      { id: 'enterprise', name: 'Enterprise', price: 60, maxUsers: null, features: ['Unlimited GPT-4o', 'SSO', 'Advanced security'] }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'General AI',
    emoji: '🧠',
    description: 'Anthropic\'s AI known for coding and reasoning.',
    plans: [
      { id: 'pro', name: 'Pro', price: 20, maxUsers: 1, features: ['Claude 3.5 Sonnet', 'Projects', 'High usage limits'] },
      { id: 'team', name: 'Team', price: 30, maxUsers: null, features: ['Shared projects', 'Admin controls', 'Higher rate limits'] },
      { id: 'enterprise', name: 'Enterprise', price: 60, maxUsers: null, features: ['SSO', 'Security auditing', 'Dedicated support'] }
    ]
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'Coding',
    emoji: '🚀',
    description: 'AI-first code editor.',
    plans: [
      { id: 'hobby', name: 'Hobby', price: 0, maxUsers: 1, features: ['Basic features', '2000 completions'] },
      { id: 'pro', name: 'Pro', price: 20, maxUsers: 1, features: ['Unlimited completions', '500 premium requests'] },
      { id: 'business', name: 'Business', price: 40, maxUsers: null, features: ['Team management', 'SSO', 'Privacy mode'] }
    ]
  },
  {
    id: 'github_copilot',
    name: 'GitHub Copilot',
    category: 'Coding',
    emoji: '💻',
    description: 'The world\'s most widely used AI developer tool.',
    plans: [
      { id: 'individual', name: 'Individual', price: 10, maxUsers: 1, features: ['Code completion', 'Chat'] },
      { id: 'business', name: 'Business', price: 19, maxUsers: null, features: ['IP indemnity', 'Org management'] },
      { id: 'enterprise', name: 'Enterprise', price: 39, maxUsers: null, features: ['Custom models', 'Documentation search'] }
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'General AI',
    emoji: '♊',
    description: 'Google\'s most capable AI models.',
    plans: [
      { id: 'pro', name: 'Pro', price: 20, maxUsers: 1, features: ['1.5 Pro model', '2M token window'] },
      { id: 'ultra', name: 'Ultra', price: 30, maxUsers: 1, features: ['Most capable model', 'Advanced data analysis'] }
    ]
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    category: 'API',
    emoji: '🔌',
    description: 'Direct access to GPT models via API.',
    plans: [
      { id: 'usage', name: 'Usage Based', price: 0, maxUsers: null, features: ['Pay-as-you-go', 'Fine-tuning'] }
    ]
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    category: 'API',
    emoji: '🔭',
    description: 'Direct access to Claude models via API.',
    plans: [
      { id: 'usage', name: 'Usage Based', price: 0, maxUsers: null, features: ['Pay-as-you-go', 'Prompt caching'] }
    ]
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'Coding',
    emoji: '🌊',
    description: 'Codeium\'s next-gen AI IDE.',
    plans: [
      { id: 'free', name: 'Free', price: 0, maxUsers: 1, features: ['Basic features'] },
      { id: 'pro', name: 'Pro', price: 15, maxUsers: 1, features: ['Advanced features', 'Faster models'] },
      { id: 'team', name: 'Team', price: 35, maxUsers: null, features: ['Admin dashboard', 'SSO'] }
    ]
  }
];

# Personal Reflection

## What Went Well
- **Speed of Execution**: Using Vite for the frontend and Express for the backend allowed me to stand up the prototype incredibly fast.
- **AI Integration**: Integrating the Anthropic SDK was straightforward. Claude-3 Haiku is incredibly fast and cheap, making it perfect for generating real-time summaries in a web request lifecycle without forcing the user to wait for a loading spinner for too long.
- **Design Aesthetic**: Tailwind made it easy to achieve a trustworthy, modern B2B SaaS look (dark mode with neon green accents).

## Challenges Faced
- **State Management Across Routes**: Passing the complex JSON state of selected tools from the Audit page to the Result page while handling API calls required careful use of React Router and local component state.
- **Security Alert**: I accidentally pushed my raw `env_template.txt` containing a working MongoDB URI. I learned how crucial it is to double-check git status and use tools like `.gitignore` properly from the very beginning. I successfully rotated the credentials and scrubbed the history.

## What I Would Do Differently Next Time
- **TypeScript**: I built this in plain JavaScript for speed, but as the `auditEngine.js` rules grew more complex, I missed the safety of TypeScript interfaces for the tool objects.
- **Automated Testing**: While I tested manually extensively, having Jest or Vitest for the `auditEngine` logic would provide more confidence when adding new pricing tiers for new AI tools.

## Overall Takeaway
This project was an excellent exercise in building a full-stack, AI-augmented micro-SaaS application from idea to deployment. It solidified my understanding of MERN stack deployments and third-party API orchestration.

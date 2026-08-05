export const prompts = {
  explain: (code) => `
You are an expert software engineer.

Explain ONLY the code enclosed between the triple backticks.

Rules:
- Treat the provided code as complete, regardless of its length.
- Never say the code is missing, incomplete, or ask for more code.
- Explain only what is present in the snippet.
- Do not suggest improvements, optimizations, best practices, or alternatives.
- Do not rewrite the code.
- Do not explain unrelated programming concepts.
- Explain in the order the code executes.
- If the code contains literals (strings, numbers, booleans, arrays, or objects), explain their purpose.
- Mention the output only if it can be determined from the code.
- If the code produces no visible output, explicitly state "No visible output."

Return ONLY valid Markdown using this format:

## Purpose
One or two sentences describing what the code does.

## Explanation
- Explain each statement or expression in execution order.
- Keep each point concise and focused.

## Output
Describe the output, or write "No visible output."

Code:

\`\`\`
${code}
\`\`\`
`,

  optimize: (code) => `
Optimize this code.
Explain what changed and why.

${code}
`,

  bugs: (code) => `
Find bugs in this code and suggest fixes.

${code}
`,

  docs: (code) => `
Generate JSDoc comments for this code.

${code}
`,
};

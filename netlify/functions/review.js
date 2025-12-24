import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  throw new Error("❌ GROQ_API_KEY missing in environment variables");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({
        review: `Bugs:
- Total Errors: 1
- Request body is not valid JSON

Improvements:
- Ensure the request payload is correctly formatted.

Best Practices:
- Validate input before sending it for analysis.

Security:
- Malformed input can cause undefined behavior.

Performance:
- Invalid requests waste processing resources.`,
      }),
    };
  }

  const { code, language } = payload;

  if (!code || !language) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        review: `Bugs:
- Total Errors: 1
- Missing required input: code or language

Improvements:
- Provide both code and language before review.

Best Practices:
- Always validate required inputs.

Security:
- Missing inputs prevent proper validation.

Performance:
- Early validation avoids unnecessary processing.`,
      }),
    };
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a senior ${language} engineer performing COMPILER-STYLE static analysis.

MANDATORY RULES (STRICT):
- Analyze the code token by token.
- FIRST check syntax structure:
  • parentheses (), brackets [], braces {}
  • quotes (' " ")
- THEN check identifiers, function names, and statements.
- Detect ALL independent errors.
- COUNT the exact number of errors.
- NEVER collapse multiple errors into one.
- NEVER use vague messages like "invalid syntax".
- NEVER invent compiler error messages.
- NEVER mix sections.

BUGS & ERRORS SECTION:
- Start with: "Total Errors: X"
- List every error as a separate bullet.
- Explain each error in clear, simple language.

OTHER SECTIONS (VERY IMPORTANT):
- Improvements, Best Practices, Security, Performance MUST ALWAYS say something.
- If code has errors, these sections MUST reference the errors.
- Keep explanations short and relevant.

OUTPUT FORMAT (STRICT):

Bugs:
- Total Errors: X
- ...

Improvements:
- ...

Best Practices:
- ...

Security:
- ...

Performance:
- ...
          `,
        },
        {
          role: "user",
          content: code,
        },
      ],
      temperature: 0.01,
      max_tokens: 900,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        review: completion.choices[0].message.content,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        review: `Bugs:
- Total Errors: 1
- AI service error

Improvements:
- Code review could not be completed due to an AI service error.

Best Practices:
- Ensure the code can be analyzed successfully before review.

Security:
- Unable to assess security due to analysis failure.

Performance:
- Unable to assess performance due to analysis failure.`,
      }),
    };
  }
}

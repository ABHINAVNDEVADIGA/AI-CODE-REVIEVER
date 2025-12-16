import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  throw new Error("❌ GROQ_API_KEY missing in .env file");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function reviewCode(code, language) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ VALID MODEL
      messages: [
        {
          role: "system",
          content: `
You are a senior software engineer.
Review the given ${language} code.
Return response strictly in this format:

Bugs:
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
      temperature: 0.3,
      max_tokens: 900,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(
      "Groq API Error:",
      error.response?.data || error.message
    );
    return `Bugs:\n- AI service error\n\nImprovements:\n- Try again later\n\nBest Practices:\n- N/A\n\nSecurity:\n- N/A\n\nPerformance:\n- N/A`;
  }
}

// utils/geminiTopicDetail.js
import axios from "axios";

export const getTopicDetailFromGemini = async ({ name, concepts, projects }) => {
  const prompt = `
  You are a powerful AI teaching assistant backed by Google, capable of guiding students, creators, and professionals across all domains — technical or non-technical.
  
  Topic: ${name}
  
  Concepts:
  ${concepts.map((c, i) => `${i + 1}. ${c}`).join("\r\n")}
  
  Projects (if relevant):
  ${projects.map((p, i) => `${i + 1}. ${p}`).join("\r\n")}
  
  Your job:
  1. Detect whether the topic is **tech-related** (e.g., coding, web, AI, etc.) or **non-tech** (e.g., cooking, electrician, civil, music, etc.).
  2. Based on the topic type:
     - If **tech-related**, for each concept, provide a clear 2–3 sentence explanation and add a short relevant code snippet if helpful. Then for each project, include:
       - A 1-line project goal
       - Tools or stack used
       - A detailed, step-by-step guide from setup to final result
       - A 3–5 line code snippet if it adds clarity
     - If **non-tech**, skip code and software. Instead:
       - For each concept, provide a simple, real-world explanation in 2–3 sentences
       - For each project (or task), replace with a clear **how-to** explanation (step-by-step) and practical advice
       - Explain in a friendly way so that a complete beginner with no tech background can easily understand and follow.
  
  Format:
  - Use clean, easy-to-read plain text.
  - No markdown, no HTML.
  - Focus on clarity, simplicity, and usefulness.
  - Take your time — your explanation must fully satisfy and guide the user like a professional coach or mentor would.
  
  Respond now:
  `.trim();
  

  const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const res = await axios.post(
    GEMINI_API,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 40000,
    }
  );

  return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

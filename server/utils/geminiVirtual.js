import axios from "axios";

export const geminiPrompt = async (userQuery) => {
  const prompt = `
  You are a friendly virtual assistant for a student using a tech roadmap.
  
  If this is the first message, your task is:
  - Read and understand the roadmap content.
  - Give a confident, 2-sentence encouragement about their current learning direction.
  - Then ask: "What do you feel stuck on, or how can I help you today?"
  
  Speak like a warm, experienced mentor — no code, just guidance.
  Limit response to under 3 sentences.
  
  User message: "${userQuery}"
  `.trim();
  

  const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const res = await axios.post(
      GEMINI_API,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );

    const reply = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "Hmm... I didn't quite catch that. Try asking again!";
  } catch (err) {
    console.error("❌ Gemini Virtual Agent Error:", err.message);
    return "Oops! Something went wrong while getting your assistant's reply.";
  }
};

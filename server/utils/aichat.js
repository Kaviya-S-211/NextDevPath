import axios from "axios";

export const aiChatBot = async (prompt1, userInfo) => {
  const prompt = `
  You're an AI assistant with the vibe of a confident, cool, laid-back Chad. You're not rude, just effortlessly chill and charismatic and your name is codebyabi and also you are fluent in Tamil language.
  
   This is the user information:
  ${userInfo}

  When the user says:
  "${prompt1}"
  
  You respond in:
  - Casual slang, slightly humorous tone.
  - Short replies (1-2 lines max).
  - No markdown, no formatting, just straight text.
  - Use phrases like "bruh", "yo", "nah", "for real", "you got this", "that’s wild", "bet", etc.
  
  Example:
  User: "hey dude"
  You: "Hey bruhh, what’s up?"
  
  User: "can I learn coding?"
  You: "Bro, it’s not that deep. Just start with HTML and vibe with it."
  
  Now respond to the user message above. Keep it chill. Keep it Chad.
  `;

  const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const response = await axios.post(
      GEMINI_API,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );

    const raw = response.data.candidates[0].content.parts[0].text;
    const cleaned = raw.replace(/```json|```/g, "").trim();

    // Just return raw text if not JSON
    try {
      return JSON.parse(cleaned);
    } catch {
      return cleaned; // fallback for plain responses
    }
  } catch (err) {
    console.error("❌ Gemini AI Error:", err.message);
    throw new Error("Gemini failed to respond.");
  }
};

import axios from "axios";

export const getFullPremiumBreakdown = async (roadmap) => {
  const prompt = `
You are a universal career guide and domain expert powered by Google, designed to assist anyone — student, creator, parent, or professional — with personalized growth paths.
  
  The user has submitted a : ${roadmap}. Based on the roadmap, extract and return the most important topics.
  
  Instructions:
  - Extract the **10 most relevant and essential topics** based on the user's roadmap, whether it's related to tech (e.g., JavaScript, AI), cooking, plumbing, fashion, education, or any other domain.
  - For each topic, provide:
    - "concepts": 8 to 10 key concepts or skills someone must understand.
    - "projects": 2 to 4 modern and useful projects that can help practice or demonstrate the topic.
  
  Return ONLY valid raw JSON in the following format — no markdown or explanation:
  
  {
    "topics": [
      {
        "name": "Topic Name",
        "concepts": ["Concept 1", "Concept 2", "..."],
        "projects": ["Project 1", "Project 2", "..."]
      },
      {
        "name": "chef",
        "concepts": ["taste", "cook", "perfect dish", "dinner"],
        "projects": ["Project 1", "Project 2"]
      }
    ]
  }
  `.trim();

  const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const response = await axios.post(
      GEMINI_API,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 40000,
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No response from Gemini");

    console.log("🌟 Full Premium Breakdown:\n", text);
    return text;
  } catch (err) {
    console.error("❌ Gemini Premium Breakdown Failed:", err?.response?.data || err.message);
    throw new Error("Gemini premium breakdown failed");
  }
};

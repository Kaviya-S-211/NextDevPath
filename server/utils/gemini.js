import axios from "axios";

// Fallback icons if Gemini gives broken ones
const DEFAULT_ICONS = [
  "https://img.icons8.com/ios/50/help.png",
  "https://img.icons8.com/ios/50/question-mark.png",
];

// Check if an image URL is valid
const isValidImageUrl = async (url) => {
  try {
    const response = await axios.head(url);
    return (
      response.status === 200 &&
      response.headers["content-type"].startsWith("image/")
    );
  } catch {
    return false;
  }
};

// Validate multiple icons, fallback if all fail
const validateIcons = async (icons) => {
  const results = await Promise.all(
    icons.map(async (url) => (await isValidImageUrl(url) ? url : null))
  );
  const filtered = results.filter(Boolean);
  return filtered.length > 0 ? filtered : DEFAULT_ICONS;
};

export const getGeminiResponse = async (skills) => {
  const prompt = `
You are a universal career guide and domain expert powered by Google, designed to assist anyone — student, creator, parent, or professional — with personalized growth paths.

The user shared their current skills:
"${skills}"

🔍 Your mission:
1. Based on their background, **suggest 2–3 career domains** or creative fields they are best suited for, and assign a suitability percentage (e.g. 90%, 75%, etc.) to indicate how closely it matches their skills.
2. These can be technical (e.g., Web Development), creative (e.g., Content Creation), service-based (e.g., Chef), academic, business-oriented, or niche (e.g., Gardening, Vlogging, Finance, etc.).

🌱 For each suggested domain:
- Clearly explain **why** it fits their profile in 2–3 motivating sentences.
- Provide a **10-step learning or growth roadmap**, one sentence per step, beginner-friendly and practical.
- Suggest **5–10 mini projects or activities** they can try to gain confidence and experience.
- Additionally, include a two **relevant icon URL** (PNG or SVG) that visually represents the domain. It can be sourced from common icon sets like Icons8, Flaticon, or OpenMoji Example:"https://img.icons8.com/ios/50/product.png"

⚠️ FORMAT STRICTLY:
Return only VALID JSON. Do not use markdown, stars, or code fences. Must follow this exact format:

{
  "domains": [
    {
      "name": "Domain Name",
       "suitability": 90,
      "why": "Explanation...",
      "icon": ["https://link-to-relevant-icon.png", "https://link-to-relevant-icon.png"],
      "roadmap": [
        "Step 1: ...",
        ...
        "Step 10: ..."
      ],
      "projectIdeas": [
        "Project 1: ...",
        ...
        "Project 10: ..."
      ]
    },
    ...
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
        timeout: 15000,
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Validate each icon array in the domains
    for (const domain of parsed.domains) {
      domain.icon = Array.isArray(domain.icon) ? domain.icon : [];
      domain.icon = await validateIcons(domain.icon);
    }

    return parsed;
  } catch (err) {
    console.error("❌ Failed to fetch or parse Gemini JSON:", err?.response?.data || err.message);
    throw new Error("Gemini returned invalid format or failed to respond.");
  }
};

import { getGeminiResponse } from "../utils/gemini.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const analyzeSkills = async (req, res) => {
  const { skills } = req.body;
 
  if (!skills) {
    return res.status(400).json({ error: "Skill input is required" });
  }

  try {
    const roadmap = await getGeminiResponse(skills);

    console.log("Roadmap:", roadmap);
    const saved = await prisma.roadmapSession.create({
      data:{
        skills,
        roadmap,
        userId: req.user?.id || undefined,
      }
    });

    console.log("✅ Roadmap saved:", saved);
    res.json({ roadmap });
  } catch (err) {
    console.error("❌ Error saving roadmap:", err.message);
    res.status(500).json({ error: "Gemini failed", details: err.message });
  }
};
    


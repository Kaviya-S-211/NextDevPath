import express from "express";
import { getTopicDetailFromGemini } from "../utils/geminiTopicDetail.js";

const router = express.Router();

router.post("/topic-breakdown", async (req, res) => {
  try {
    const { name, concepts, projects } = req.body;

    const breakdown = await getTopicDetailFromGemini({ name, concepts, projects });

    res.json({ breakdown });
  } catch (err) {
    console.error("❌ Gemini Topic Breakdown Error:", err.message);
    res.status(500).json({ error: "Failed to generate topic breakdown" });
  }
});

export default router;

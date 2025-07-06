 import express from "express";
import { aiChatBot } from "../utils/aichat.js";  

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt , userInfo } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt required" });

  try {
    const reply = await aiChatBot(prompt, userInfo);
    res.json({ reply });
  } catch (err) {
    console.error("Gemini Assistant Error:", err.message);
    res.status(500).json({ error: "AI error", details: err.message });
  }
});

export default router;

 import express from "express";
import { geminiPrompt } from "../utils/geminiVirtual.js";

const router = express.Router();

router.post("/virtual-agent", async (req, res) => {
  const { prompt } = req.body;

  console.log("Prompt:", prompt);
  const reply = await geminiPrompt(prompt);
  res.json({ reply });
});


export default router;

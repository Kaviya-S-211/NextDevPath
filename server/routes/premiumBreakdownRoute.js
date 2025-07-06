import express from "express";
import { getFullPremiumBreakdown } from "../utils/geminiDetailed.js";

const router = express.Router();

router.post("/save-premium-roadmap", async (req, res) => {
  const { roadmap } = req.body;

   console.dir(roadmap, { depth: null });

  if (!roadmap || !Array.isArray(roadmap.domains) || roadmap.domains.some(domain => typeof domain.name !== 'string')) {
    return res.status(400).json({ error: "Invalid roadmap format" });
   }
  const domainNames = roadmap.domains.map(domain => domain.name);
  
   
  try {
    const breakdown = await getFullPremiumBreakdown(domainNames);

  
    res.status(200).json({
      message: "Premium roadmap processed successfully!",
      breakdown,
    });
  } catch (error) {
    console.error(" Failed to get premium breakdown:", error.message);
    res.status(500).json({
      error: "Gemini premium breakdown failed",
      details: error.message,
    });
  }
});

export default router;

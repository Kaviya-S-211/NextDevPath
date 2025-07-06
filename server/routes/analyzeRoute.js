import express from "express";
import { analyzeSkills } from "../controller/analyzeController.js";
 
const router = express.Router();

// POST /api/analyze
router.post("/analyze",analyzeSkills);

export default router;

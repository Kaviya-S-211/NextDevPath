import express from "express";
import { handleAuth } from "../controller/authController.js";
const router = express.Router();

router.post("/auth", handleAuth);  

export default router;

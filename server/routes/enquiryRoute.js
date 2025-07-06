import express from "express";
import { handleEnquiry } from "../controller/enquiryController.js";
import { authenticate } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/contact", authenticate, handleEnquiry);

export default router;

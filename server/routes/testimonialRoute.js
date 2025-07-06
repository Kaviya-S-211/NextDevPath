import express from "express";
import { submitTestimonial, getTestimonials } from "../controller/testimonialController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/testimonial", authenticate, submitTestimonial);
router.get("/testimonial", getTestimonials);

export default router;

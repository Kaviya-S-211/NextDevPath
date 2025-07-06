import express from "express";
 import { authenticate } from "../middleware/authMiddleware.js";
import { getUserData } from "../controller/userController.js";

const router = express.Router();

router.get("/me", getUserData);

export default router;

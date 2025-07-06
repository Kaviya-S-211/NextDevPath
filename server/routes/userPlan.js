import express from "express";
import {PrismaClient} from "@prisma/client";
const router = express.Router();

const prisma = new PrismaClient();

router.get("/get-user-plan", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ plan: user.plan || "free" });
  } catch (err) {
    console.error("Error fetching user plan:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

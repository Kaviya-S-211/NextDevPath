import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();



const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

router.post("/stripe/session", async (req, res, next) => {
  try {
    const { amount, plan, userEmail } = req.body; // Include userEmail from client

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: `CodeCred – ${plan} Plan` },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?plan=${plan}`,  // ✅ TEMPORARY (no session ID)
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: { plan, userEmail }, // Store email in metadata
    });

    // Do NOT update plan in DB here — wait for Stripe webhook to confirm payment

    res.json({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err) {
    next(err);
  }
});


export default router;

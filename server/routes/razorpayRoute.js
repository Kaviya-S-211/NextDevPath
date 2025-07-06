import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

 router.post("/razorpay/order", async (req, res, next) => {
  try {
    const { amount, plan } = req.body;
    const order = await razorpay.orders.create({      
      amount: amount * 100,          
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
      notes: { plan },
      payment_capture: 1,
    });
    return res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY });
  } catch (e) {
    next(e);
  }
});

 router.post("/razorpay/verify", async(req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userEmail, plan } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, msg: "Missing fields" });
  }
  const expected = crypto
  .createHmac("sha256", process.env.RAZORPAY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest("hex");


  const isValid = crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(razorpay_signature)
  );
  if (isValid) {
     await prisma.user.update({
      where: { email: userEmail },
      data: { plan: plan.toLowerCase() }, 
    });

    return res.status(200).json({ success: true });
  }



  return res.status(isValid ? 200 : 400).json({ success: isValid });
});

export default router;

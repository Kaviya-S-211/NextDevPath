import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "secret-code";
const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET || "my-encryption-key"; 

export const handleAuth = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      const valid = await bcrypt.compare(password, existing.password);
      if (!valid)
        return res.status(401).json({ success: false, message: "Incorrect password" });

      const token = jwt.sign({ id: existing.id }, JWT_SECRET, { expiresIn: "7d" });

       const encryptedToken = CryptoJS.AES.encrypt(token, ENCRYPT_SECRET).toString();

      return res.json({ success: true, token: encryptedToken, user: { email: existing.email } });
    }

     const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });


    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "7d" });
    const encryptedToken = CryptoJS.AES.encrypt(token, ENCRYPT_SECRET).toString();

    return res.json({ success: true, token: encryptedToken, user: { email: newUser.email } });

  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

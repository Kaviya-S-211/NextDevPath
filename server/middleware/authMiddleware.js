import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  try {
    const encryptedToken = req.headers.authorization?.split(" ")[1];
    if (!encryptedToken) return next(); 

     const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPT_SECRET);
    const token = bytes.toString(CryptoJS.enc.Utf8);

    if (!token) throw new Error("decrypiton failed");  

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "invalidd" });
  }
};

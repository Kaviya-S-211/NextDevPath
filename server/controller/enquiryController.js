// enquiryController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const handleEnquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        userId: req.user?.id || undefined, 
        name,
        email,
        message,
      },
    });

    console.log("New enquiry saved:", enquiry);
    res.status(200).json({ success: true, enquiry });

  } catch (err) {
    console.error("Error saving enquiry:", err.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const submitTestimonial = async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        message,
        userId: req.user?.id || undefined,
      },
    });

    res.status(201).json({ success: true, testimonial });
  } catch (err) {
    console.error("Testimonial Error:", err.message);
    res.status(500).json({ error: "Failed to submit testimonial" });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ testimonials });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};

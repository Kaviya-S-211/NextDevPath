export const getUserData = async (req, res) => {
  try {
    const userId = req.user?.id;  
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        sessions: { orderBy: { createdAt: "desc" } },
        enquiries: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User Email:", user.email); // ✅ This prints the user email

    res.json({
      email: user.email,
      sessions: user.sessions,
      enquiries: user.enquiries,
    });
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

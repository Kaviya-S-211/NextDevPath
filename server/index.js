import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import analyzeRoute from "./routes/analyzeRoute.js";
import enquiryRoute from "./routes/enquiryRoute.js";
import authRoute from "./routes/authRoute.js";
import { authenticate } from "./middleware/authMiddleware.js";
import userRoute from "./routes/userRoute.js";
import testimonialRoute from "./routes/testimonialRoute.js";
import aiAssistantRoute from "./routes/aiAssistant.js";
import premiumBreakdownRoute from "./routes/premiumBreakdownRoute.js";
import topicBreakdownRoute from "./routes/topicBreakdown.js";
import virtualAgentRoute from "./routes/virtualAgent.js";
 import razorpayRoute from "./routes/razorpayRoute.js";
 import stripeRoute from "./routes/stripeRoute.js";
 import userPlan from "./routes/userPlan.js";
 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/api", authRoute);
app.use("/api", analyzeRoute);
app.use("/api", enquiryRoute);
app.use("/api", userRoute);
app.use("/api", testimonialRoute);  
app.use("/api/ai-assistant", aiAssistantRoute);
app.use("/api", premiumBreakdownRoute);
app.use("/api", topicBreakdownRoute);
app.use("/api", virtualAgentRoute);
 app.use("/api", razorpayRoute);
 app.use("/api", stripeRoute);
 app.use("/api", userPlan);
 
 const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//export default app;

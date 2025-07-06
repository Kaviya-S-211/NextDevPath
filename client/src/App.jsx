import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import RoadmapResult from "./components/RoadmapResult";
import SkillForm from "./components/SkillForm";
import LandingHero from "./components/LandingHero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
// import Login from "./components/Login";
import Testimonials from "./components/Testimonials";
import { TestimonialProvider } from "./context/TestimonialContext";
import AIAssistant from "./components/AIAssistant";
// import PricingPlans from "./components/PricingPlans";
import PremiumDetailPage from "./components/PremiumDetailPage";
import TopicDetailBreakdown from "./components/TopicDetailBreakdown";
import VirtualAgent from "./components/VirtualAgent";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";
import ResumeBilder from "./components/ResumeBilder";

function App() {
  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem("roadmap");
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage whenever roadmap updates
  useEffect(() => {
    if (roadmap) {
      localStorage.setItem("roadmap", JSON.stringify(roadmap));
    }
  }, [roadmap]);

  useEffect(() => {
    const moveDots = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      document.body.style.backgroundPosition = `${x}px ${y}px, ${x}px ${y}px, center`;
    };

    window.addEventListener("mousemove", moveDots);
    return () => window.removeEventListener("mousemove", moveDots);
  }, []);

  return (
    <TestimonialProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<LandingHeroWrapper setRoadmap={setRoadmap} />}
          />
          <Route
            path="/resume"
            element={<ResumeBilder />}
          />
          <Route
            path="/fillform"
            element={<SkillForm setRoadmap={setRoadmap} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={<Dashboard setRoadmap={setRoadmap} />}
          />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/testimonials" element={<Testimonials />} />
          <Route
            path="/result"
            element={
              <>
                <RoadmapResult roadmap={roadmap} />
                <AIAssistant />
              </>
            }
          />
          {/* <Route path="/pricing" element={<PricingPlans />} /> */}
          <Route path="/premium-roadmap" element={<PremiumDetailPage />} />
          <Route path="/topic-detail" element={<TopicDetailBreakdown />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel"  element={<PaymentCancel  />} />
          <Route
            path="/assistant"
            element={<VirtualAgent roadmap={roadmap} />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard setRoadmap={setRoadmap} />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <Dashboard setRoadmap={setRoadmap} />
              </PrivateRoute>
            }
          />
        </Routes>
        <AIAssistant />
      </Router>
    </TestimonialProvider>
  );
}

function LandingHeroWrapper() {
  const navigate = useNavigate();
  return <LandingHero onResume={() => navigate("/resume")} onRoadmap={() => navigate("/fillform")} />;
}

export default App;

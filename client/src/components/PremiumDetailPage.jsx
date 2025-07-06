import React, { useEffect, useState } from "react";
import SpotlightCard from "./SpotlightCard";
import { useNavigate } from "react-router-dom";

export default function PremiumDetailPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentPlan = localStorage.getItem("plan") || "free";
  const limit = Number(localStorage.getItem("freeGenCount") || 0);
  
   useEffect(() => {
    const lastDate = localStorage.getItem("freeGenDate");
    const today = new Date().toDateString();
  
    if (currentPlan === "free" && lastDate !== today) {
      localStorage.setItem("freeGenCount", "0");
      localStorage.setItem("freeGenDate", today);
    }
  }, []);
  
  const planLimits = {
    free: 4,
    pro: 100,
    ultimate: 9999,
  };

  const maxAllowed = planLimits[currentPlan] || 0;

  useEffect(() => {
    const cached = localStorage.getItem("premiumTopics");
    if (cached) {
      setTopics(JSON.parse(cached));
      setLoading(false);
    } else {
      generateOrWarn();
    }
  }, []);

  const generateOrWarn = () => {
    if (limit >= maxAllowed) {
      alert("⚠️ You’ve reached your premium generation limit. Upgrade to unlock more.");
      return;
    }
    fetchBreakdown();
  };

  const fetchBreakdown = async () => {
    setLoading(true);
    const stored = localStorage.getItem("premiumRoadmap");
    if (!stored) return;

    try {
      const res = await fetch("http://localhost:4000/api/save-premium-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roadmap: JSON.parse(stored) }),
      });

      const data = await res.json();
      console.log(data);
      const cleaned = data.breakdown.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      setTopics(parsed.topics || []);
      localStorage.setItem("premiumTopics", JSON.stringify(parsed.topics || []));

      // Track usage
      localStorage.setItem("freeGenCount", limit + 1);
    } catch (err) {
      console.error("❌ Error fetching breakdown:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-8 text-white mt-16">
      <h1 className="text-4xl text-center text-yellow-400 font-bold mb-10">
        Premium Topic Breakdown
      </h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <button
          onClick={() => {
            localStorage.removeItem("premiumTopics");
            generateOrWarn();
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg shadow-sm transition-all duration-200 text-sm"
        >
          Regenerate Breakdown
        </button>

        <button
          onClick={() => {
            const roadmap = localStorage.getItem("premiumRoadmap");
            if (roadmap) {
              localStorage.setItem("agentRoadmap", roadmap);
              window.location.href = "/assistant";
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition-all duration-200 text-sm"
        >
          Your Assistant
        </button>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <SpotlightCard
              key={i}
              className="custom-spotlight-card cursor-pointer"
              spotlightColor="rgba(255, 235, 59, 0.1)"
            >
              <div
                onClick={() => navigate("/topic-detail", { state: { topic } })}
                className="bg-white/10 border border-yellow-500 backdrop-blur-xl rounded-xl p-5 space-y-3 shadow-lg"
              >
                <h2 className="text-lg font-semibold tracking-wide text-yellow-300 font-sans">
                  {topic.name}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-[15px] leading-relaxed font-medium font-sans">
                  {topic.concepts?.slice(0, 10).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
                {topic.projects?.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-yellow-200">Example Project</h3>
                    <p className="text-gray-400 text-[14px] font-sans">
                      {topic.projects[0]}
                    </p>
                  </div>
                )}
                <div className="pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/topic-detail", { state: { topic } });
                    }}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-sm font-semibold text-black rounded-lg shadow"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </section>
  );
}

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-40 bg-white/10 rounded-xl animate-pulse"></div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SkillForm({ setRoadmap }) {
  const [skillsInput, setSkillsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dotCount, setDotCount] = useState(0);
  const [generatedDomain, setGeneratedDomain] = useState(""); 

  const navigate = useNavigate();

  
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        const elapsed = window.performance.now();
        setDotCount(Math.floor(elapsed / 300) % 4);
      }, 100);
    } else {
      setDotCount(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skillsInput.trim()) return setError("Please describe your skills");

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillsInput }),
      });
console.log(res)
      if (!res.ok) throw new Error(res.statusText === "Unauthorized" ? "Please login to get roadmap" : "Failed to get roadmap");

      const data = await res.json();
      setRoadmap(data.roadmap);
      setGeneratedDomain(data.roadmap.domains[0]?.name); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Describe Your Skills</h2>
          <p className="text-gray-400 text-lg">
            Write what you’ve learned so far - tools, tech, and your experience
          </p>
        </div>

        {error && (
          <div className="text-center text-red-400 font-medium mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            rows="6"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Example: I know HTML, CSS, React basics, GitHub, REST APIs, Express.js..."
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl text-lg font-semibold disabled:opacity-50"
          >
            {loading
              ? `Generating your roadmap${".".repeat(dotCount)}`
              : "Get My Custom Roadmap"}
          </button>



        </form>

         {generatedDomain && (
          <div className="mt-8 text-center space-y-4">
            <p className="text-green-400 font-medium">
              ✅ Your roadmap is <span className="text-blue-300">{generatedDomain}</span>
            </p>
            <button
              onClick={() => navigate("/result")}
              className="bg-green-600 hover:bg-green-700 transition text-white py-2 px-6 rounded-lg font-semibold"
            >
              View My Roadmap
            </button>
            
          </div>
        )}
      </div>
    </section>
  );
}

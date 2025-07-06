import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyRoadmapPDF from "./MyRoadmapPDF";

export default function RoadmapResult({ roadmap }) {
   if (!roadmap?.domains?.length) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        No roadmap data found. Please go back and fill out the skill form.
      </div>
    );
  }

  const isPremium = true
  return (
    <section className="min-h-screen px-6 py-12 mt-10 md:px-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-12">
        Recommended Domains & Roadmaps
      </h1>

      <div className="space-y-16">
        {roadmap.domains.map((domain, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg p-8 text-white">
            <div className="mb-6">
            <div className="flex items-center gap-4 mt-4 justify-between align-center">
            <div className="relative w-24 h-12 ">
  {domain.icon.map((iconUrl, index) => (
    <img
      key={index}
      src={iconUrl}
      alt={`icon-${index}`}
      className={`absolute top-0 left-[${index * 20}px] w-12 h-12 bg-blue-400 rounded-full object-cover  border-2 border-white shadow`}
      style={{ left: `${index * 30}px`, zIndex: domain.icon.length - index }}
    />
  ))}
</div>

  <h2 className="text-3xl font-semibold text-blue-400">{domain.name}</h2>

  <h2 className="text-gray-300 text-xl">{domain.suitability}%</h2>
</div>

              <p className="mt-2 text-gray-300">{domain.why}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-medium text-blue-300 mb-4">📘 Learning Roadmap</h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-200">
                {domain.roadmap.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-medium text-green-300 mb-4">🧪 Projects to Build</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-200">
                {domain.projectIdeas.map((proj, i) => (
                  <li key={i}>{proj}</li>
                ))}
              </ul>
            </div>
            {/* Premium Button */}
<div className="mt-6">
{isPremium ? (
  <button
    onClick={() => {
       localStorage.removeItem("premiumRoadmap");
      localStorage.removeItem("premiumTopics");

      const singleClickedDomain = {
        domains: [domain],
      };
      localStorage.setItem("premiumRoadmap", JSON.stringify(singleClickedDomain));
      window.location.assign("/premium-roadmap");
    }}
    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-xl transition"
  >
    More Details
  </button>
) : null}

  






</div>

          </div>
        ))}
      </div>

 
<div className="text-center mt-16">
  <PDFDownloadLink
    document={<MyRoadmapPDF roadmap={roadmap} />}
    fileName="roadmap.pdf"
  >
    {({ loading }) => (
      <button
        className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-6 rounded-xl text-lg font-medium"
        disabled={loading}
      >
        {loading ? "Preparing PDF..." : "📄 Download All Roadmaps as PDF"}
      </button>
    )}
  </PDFDownloadLink>

  {/* Share Experience CTA */}
  <div className="mt-8 space-y-4">
    <p className="text-gray-300 text-lg">
      Loved your roadmap? ✨
    </p>
    <a
      href="/testimonials"
      className="inline-block bg-green-600 hover:bg-green-700 transition text-white py-2 px-6 rounded-xl font-medium"
    >
      Share Your Experience
    </a>
  </div>
</div>

    </section>
  );
}

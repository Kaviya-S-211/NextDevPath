import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function TopicDetailBreakdown() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const topic = location.state?.topic;
  
    useEffect(() => {
      if (!topic) return;
  
      const cached = localStorage.getItem(`breakdown-${topic.name}`);
      if (cached) {
        setContent(cached);
        setLoading(false);
      } else {
        fetchDetails();
      }
    }, [topic]);
  
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/topic-breakdown", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(topic),
        });
  
        const data = await res.json();
        setContent(data.breakdown);
        localStorage.setItem(`breakdown-${topic.name}`, data.breakdown);
      } catch (err) {
        console.error("Error:", err);
        setContent("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
  
    const escapeHtml = (unsafe) => unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  
      const formatText = (text) => {
        const safe = escapeHtml(text);
        return safe
          .replace(/(\d+:\s)([\w\s]+):/g, `<span class="text-blue-400 font-medium">$1$2:</span>`)
          .replace(/\\*Projects:\*\*/g, `<span class="text-pink-400 font-bold text-lg">Projects:</span>`)
          .replace(/Goal:/g, `<span class="text-green-300 font-medium">Goal:</span>`)
          .replace(/Tools\/stack:/gi, `<span class="text-purple-300 font-medium">Tools/Stack:</span>`)
          .replace(/Steps:/g, `<span class="text-yellow-300 font-medium">Steps:</span>`)
          .replace(/^(\d+\.)\s/gm, `<span class="text-yellow-400 font-bold">$1</span> `)
          .replace(/```(.*?)```/gs, (_, code) => {
            return `
<pre class="bg-black/60 p-3 rounded-lg text-sm text-white font-mono overflow-x-auto border border-white/10 scrollbar-hide mb-3">
  <code>${code.trim()}</code>
</pre>`;
          });
};
 
      

  return (
    <section className="p-8 scrollbar-hide text-white mt-16">
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-yellow-400">{topic?.name} – Deep Dive</h1>
        <button
          onClick={() => {
            localStorage.removeItem(`breakdown-${topic.name}`);
            fetchDetails();
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-1 rounded-lg text-sm"
        >
          Regenerate
        </button>
      </div>

      <div
  className="bg-white/10  p-6 rounded-xl shadow-lg border border-yellow-600 max-h-[80vh] overflow-y-auto font-sans text-[15px] leading-relaxed text-gray-100 whitespace-pre-wrap scrollbar-hide"
  dangerouslySetInnerHTML={{
    __html: loading ? "Loading breakdown..." : formatText(content),
  }}
/>

    </section>
  );
}

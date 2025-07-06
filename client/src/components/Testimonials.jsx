import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestCard from "./TestCard";
import { useTestimonials } from "../context/TestimonialContext";

export default function Testimonials() {
  const { testimonials, setTestimonials } = useTestimonials();
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  // Fetch testimonials
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/testimonial");
        const data = await res.json();
        setTestimonials(data.testimonials);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:4000/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submit failed");

      const data = await res.json();
      setTestimonials((prev) => [data.testimonial, ...prev]);
      setForm({ name: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen px-6 py-20 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold text-blue-500 mb-10 text-center">What Our Users Say</h1>

      {/* Submit Testimonial Form */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg mb-16">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Share Your Experience</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="What do you love about this platform?"
            className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          ></textarea>

        <div className="flex gap-4">
        <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-6 rounded-xl font-medium"
          >
            {status === "loading" ? "Submitting..." : "Submit Testimonial"}
          </button>
               {/* Back to Roadmap Button */}
         <button
          onClick={() => navigate("/result")}
          className="bg-green-600  hover:bg-green-700 transition text-white py-3 px-6 rounded-xl font-medium"
        >
          ← Back to My Roadmap
        </button>
        </div>
 
          {status === "success" && <p className="text-green-400">Thank you! 🎉</p>}
          {status === "error" && <p className="text-red-400">Something went wrong 😢</p>}
        </form>
      </div>

<TestCard testimonials={testimonials} />

 
    </section>
  );
}

import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen px-6 py-24 max-w-5xl mx-auto text-white">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-6">Contact</h1>

      {/* Intro */}
      <p className="text-lg md:text-xl font-bold text-gray-300 leading-relaxed max-w-3xl mb-14">
        Want to work together, have a question, or just want to connect?  
        Fill out the form below and I’ll get back to you as soon as possible.  
        You can also reach me directly via email or social media links.
      </p>

      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-gray-300 mb-16">
        <div>
          <h3 className="text-blue-400 font-bold mb-1">Email</h3>
          <a href="mailto:codebyabi@gmail.com" className="text-blue-300 underline">codebyabi@gmail.com</a>
        </div>
        <div>
          <h3 className="text-blue-400 font-bold mb-1">Instagram</h3>
          <a href="https://instagram.com/codebyabi" className="text-blue-300 underline" target="_blank">instagram.com/codebyabi</a>
        </div>
        <div>
          <h3 className="text-blue-400 font-bold mb-1">GitHub</h3>
          <a href="https://github.com/Abi-de-jo" className="text-blue-300 underline" target="_blank">github.com/Abi-de-jo</a>
        </div>
        <div>
          <h3 className="text-blue-400 font-bold mb-1">Location</h3>
          <p>Tamil Nadu, India</p>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg p-10 md:p-12">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6">Send an Enquiry</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
              className="bg-transparent border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={handleChange}
              className="bg-transparent border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-6 rounded-xl font-medium"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-400 pt-2">Message sent successfully</p>
          )}
          {status === "error" && (
            <p className="text-red-400 pt-2">Something went wrong. Try again.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;

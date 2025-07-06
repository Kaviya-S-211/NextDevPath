// context/TestimonialContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const TestimonialContext = createContext();

export const TestimonialProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/testimonial");
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      } catch (err) {
        console.error("❌ Failed to fetch testimonials", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <TestimonialContext.Provider value={{ testimonials, setTestimonials }}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonials = () => useContext(TestimonialContext);

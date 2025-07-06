import React from 'react'
import { useTestimonials } from "../context/TestimonialContext";
 

const TestCard = () => {
  const { testimonials } = useTestimonials();
  return (
    <div>

              {/* Testimonials List - Auto Slider */}
      <div className="overflow-x-auto scrollbar-hide mb-10">
        <div className="flex gap-6 min-w-full animate-slide-left">
          {testimonials.length === 0 ? (
            <p className="text-gray-400">No testimonials yet.</p>
          ) : (
            testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-[90%] md:min-w-[48%] bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-xl space-y-2 shadow-md"
              >
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-gray-300">{t.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TestCard

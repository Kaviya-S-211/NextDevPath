import React, { useRef } from "react";
import VariableProximity from "./VariableProximity";
 import { useTestimonials } from "../context/TestimonialContext";
import VideoPlayer from "./VideoPlayer";
  //  import AdBox from "./AdBox";
export default function LandingHero({ onResume, onRoadmap }) {
  const containerRef = useRef(null);
  const { testimonials } = useTestimonials();
     return (
    <section className="relative px-6 py-24 md:py-32 text-white text-center space-y-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Turn Your Skills into <br /> <span className="text-blue-500">Career Roadmaps</span>
        </h1>

        <div ref={containerRef} style={{ position: "relative" }}>
          <VariableProximity
            label="AI-powered suggestions tailored to your tech journey. Discover the best domain for you, learn what to master next, and build real projects like a pro."
            className="text-lg md:text-xl text-gray-300 cursor-pointer"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>

     <div className="grid grid-col-1  sm:flex sm:justify-center gap-4 sm:w-full ">
   
   
   
 
  <button
          onClick={onRoadmap}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-3 py-3 rounded-xl text-lg font-semibold shadow-md transition"
        >
          Build your Roadmap
        </button>
        
 



        
        <button
  onClick={onResume}
  className="border border-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition-all duration-300 ease-in-out   hover:shadow-[0_0_12px_2px_rgba(59,130,246,0.7)]"
>
  Build your Resume
</button>

     </div>
      </div>

      <div className="text-xl font-medium text-white mt-8 cursor-pointer">Instant Guidance. Zero Guesswork.</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full mx-auto">
  {[
    {
      name: "Imran",
      domain: "Frontend Dev",
      profile: "https://yt3.googleusercontent.com/dDIeSBFn4Elyhj2aFWCBu0guigEhDvE6ildbjoS4XyQTXJ44JVCNK9xBpKklGQMazG4yKqP6ppA=s900-c-k-c0x00ffffff-no-rj",
      comment: "This helped me master Tailwind and React so fast!",
    },
    {
      name: "Abi",
      domain: "Backend Dev",
      profile: "/abi.png",
      comment: "I finally understood Express.js and built my first API.",
    },
    {
      name: "Sophia Johnson",
      domain: "AI Engineer",
      profile: "https://randomuser.me/api/portraits/women/12.jpg",
      comment: "The AI roadmap gave me perfect clarity on where to start.",
    },
    {
      name: "Ethan Lee",
      domain: "Tech Blogger",
      profile: "https://randomuser.me/api/portraits/men/56.jpg",
      comment: "I turned my knowledge into a content strategy in days.",
    },
    {
        name: "Ava Carter",
        domain: "Frontend Dev",
        profile: "https://randomuser.me/api/portraits/women/65.jpg",
        comment: "This helped me master Tailwind and React so fast!",
      },
      {
        name: "Liam Smith",
        domain: "Backend Dev",
        profile: "https://randomuser.me/api/portraits/men/34.jpg",
        comment: "I finally understood Express.js and built my first API.",
      },
  ].map((user, index) => (
    <div
      key={index}
      className="flex items-center gap-4 cursor-pointer bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-white hover:scale-[1.02] transition"
    >
      {/* Left: Image */}
      <img
        src={user.profile}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover border border-white/20"
      />

      {/* Right: Text */}
      <div>
        <h4 className="text-lg font-semibold">{user.name}</h4>
        <p className="text-sm text-blue-400 mb-1">{user.domain}</p>
        <p className="text-xs text-gray-300">{user.comment}</p>
      </div>
    </div>
  ))}
</div>


      <div className="w-full max-w-6xl mx-auto mt-24">
  <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-400 mb-12">
    How It Works
  </h2>

  <VideoPlayer />

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 xl:gap-20 justify-items-center w-full">
  {[
    {
      title: "1. Describe Your Skills",
      desc: "Tell us what you know – tools, languages, frameworks, anything.",
    },
    {
      title: "2. Get Domain Suggestions",
      desc: "We use skilled experts to suggest the best domains for your growth.",
    },
    {
      title: "3. View Your Roadmap",
      desc: "Receive a clear learning path tailored to your current skills.",
    },
    {
      title: "4. Start Building Projects",
      desc: "Turn the roadmap into real-world impact with projects and proof.",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="min-w-[300px] max-w-[340px] lg:max-w-[450px] xl:max-w-[490px] bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white shadow-md text-left space-y-3 transition-transform duration-300 "
    >
      <strong className="block text-blue-300 text-base md:text-lg font-semibold">
        {item.title}
      </strong>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.desc}</p>
    </div>
  ))}
</div>


 
</div>


<div>
{/* <AdBox /> */}

</div>



      <div className="w-full max-w-6xl mx-auto mt-24">
  <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-400 mb-12">
    Reviews
  </h2>

  <div className="overflow-x-auto scrollbar-hide px-2 cursor-pointer">
  <div className="flex gap-6 min-w-full animate-slide-left py-4">
    {testimonials?.length === 0 ? (
      <p className="text-gray-400">No testimonials yet.</p>
    ) : (
      testimonials.map((t) => (
        <div
          key={t.id}
          className="min-w-[85%] md:min-w-[50%] lg:min-w-[38%] xl:min-w-[32%]
                     mx-auto bg-gradient-to-br from-white/10 to-white/5
                     border border-white/10 backdrop-blur-lg px-6 py-4 rounded-2xl
                     shadow-lg text-left hover:scale-[1.01] transition duration-300"
        >
          <p className="text-lg text-white font-semibold">{t.name}</p>
          <p className="text-sm text-gray-300 mt-1">{t.message}</p>
          <p className="text-xs text-gray-500 mt-3">
            {new Date(t.createdAt).toLocaleString()}
          </p>
        </div>
      ))
    )}
  </div>
</div>



 

<div className="pt-12 text-gray-500 text-sm text-center">
  © 2025 <span className="text-white font-semibold">NextDevPath</span> • All rights reserved.
  </div>
</div>

    </section>
  );
}

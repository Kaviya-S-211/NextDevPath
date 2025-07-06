import React from "react";

const About = () => {
  return (
    <section className="min-h-screen px-6 py-20 text-white max-w-5xl mx-auto cursor-pointer ">
      {/* Glassmorphic Wrapper */}
      <div className=" backdrop-blur-[0px]    rounded-3xl  p-10 md:p-14 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-10">
         <a href="https://github.com/Abi-de-jo">
          <img
            src="/git.png"
          
            alt="Abishek"
            className="w-36 h-36 rounded-full object-cover shadow-md border border-white/10"
          />
          </a>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-500">Abishek</h1>
            <p className="text-lg text-gray-300 mt-1">
              Founder of <span className="font-semibold text-white">NextDevPath</span> & <span className="font-semibold text-white">CodeByAbi</span>
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="text-gray-300 text-lg leading-relaxed space-y-6">
          <p>
            I'm a passionate <span className="text-blue-300 font-semibold">Computer Engineer</span> and content creator focused on simplifying tech concepts for learners. I bridge the gap between theory and implementation with crystal-clear visuals and walkthroughs.
          </p>

          <p>
            With expertise across the stack — frontend, backend, and cloud (AWS) — I enjoy building intuitive UI/UX, efficient APIs, and scalable platforms. Whether teaching, building, or leading, I bring structure and energy to the process.
          </p>

          <p>
            My mission is to <span className="text-blue-300 font-semibold">help students identify their domain and grow in it confidently</span> through clear guidance, projects, and practical exposure.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300 text-base mt-6">
          <div>
            <h3 className="text-blue-400 font-bold text-lg mb-2">Tech Stack</h3>
            <p>React, Tailwind, Node.js, Express, MongoDB, Prisma, Firebase</p>
          </div>

          <div>
            <h3 className="text-blue-400 font-bold text-lg mb-2">Projects</h3>
            <p>CodeCred (AI platform), ResumeBuilder, Timetable Generator, Event Portal</p>
          </div>

          <div>
            <h3 className="text-blue-400 font-bold text-lg mb-2">Github</h3>
            <a
              href="https://github.com/Abi-de-jo"
              className="text-blue-300 underline"
              target="_blank"
              rel="noreferrer"
            >
              @Abi-de-jo
            </a>
          </div>

          <div>
            <h3 className="text-blue-400 font-bold text-lg mb-2">Location</h3>
            <p>Tamil Nadu, India</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

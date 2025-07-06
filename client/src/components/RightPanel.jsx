import React from 'react';
import {
  FaGlobe,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import MyResumePDF from './MyResumePDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const RightPanel = ({ formData }) => {



  return (
    <div className="w-full md:w-1/2 p-4 md:p-8 bg-white text-gray-800 font-sans overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start pb-4 gap-4">
        {/* Name and Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{formData.name || "YOUR NAME HERE"}</h1>
          <p className="text-sm md:text-md text-gray-600">Developer ~ Engineer</p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm w-full md:w-auto">
          <div className="flex items-center gap-2">
            <FaGlobe className="text-blue-600" />
            <span>{formData.portfolio || "portafolio.com"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-purple-600" />
            <span>{formData.email || "email.email@example.com"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-red-500" />
            <span>{formData.phone || "11 1111 1111"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGithub className="text-cyan-600" />
            <span>{formData.github || "github.com/uma-dev"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-pink-600" />
            <span>{formData.location || "City, Country"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLinkedin className="text-gray-700" />
            <span>{formData.linkedin || "/in/your-personal-url"}</span>
          </div>
        </div>
      </div>

      {/* Summary and Skills */}
      <div className="flex flex-col md:flex-row justify-between mt-6 md:mt-2 gap-6 text-sm">
        {/* Summary */}
        <div className="w-full md:w-1/2">
          <h3 className="text-md font-bold border-b border-black mb-2">SUMMARY</h3>
          <p className="text-gray-800 leading-relaxed">
            {formData.summary ||
              `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.`}
          </p>
        </div>

        {/* Skills */}
        <div className="w-full md:w-1/2">
          <h3 className="text-md font-bold border-b border-black mb-2">SKILLS</h3>
          <p className="mb-1">
            <span className="font-semibold">Languages:</span>{" "}
            {formData.languages || "Java, SQL, Python, JavaScript, HTML, C++, C"}
          </p>
          <p>
            <span className="font-semibold">Technologies:</span>{" "}
            {formData.technologies || "GCP, Docker, Kubernetes, Spark, Hadoop, Hive"}
          </p>
        </div>
      </div>

      {/* Projects */}
      <div className="mt-8">
        <h3 className="text-md font-bold border-b border-black mb-4">PROJECTS</h3>

        {(formData.projects || []).map((project, index) => (
          <div key={index} className="mb-4 flex flex-col md:flex-row gap-3">
            {/* Technologies */}
            <div className="md:w-1/5 text-sm text-gray-700 font-medium">
              {project.technologies || 'Tech stack'}
            </div>

            {/* Project Details */}
            <div className="md:w-4/5">
              <div className="flex justify-between items-center flex-wrap">
                <span className="font-bold">{project.title}</span>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    github.com link
                  </a>
                )}
              </div>
<p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
  {project.description}
</p>
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="mt-8">
  <h3 className="text-md font-bold border-b border-black mb-4">EDUCATION</h3>

  {(formData.education || []).map((edu, index) => (
    <div key={index} className="mb-4  flex flex-col md:flex-row gap-3">
      
      {/* Timeline */}
      <div className="md:w-1/5 text-sm text-gray-700 font-medium">
        {edu.timeline || "x/2023 – x/2023"}
      </div>

      {/* Main Content */}
      <div className="md:w-4/5">
        <div className="flex justify-between items-start flex-wrap">
          {/* Title */}
          <span className="font-bold">{edu.title || "Your Degree or Course"}</span>

          {/* School */}
          <span className="text-sm font-medium text-gray-700">
            {edu.school || "School"}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
        {edu.description}
        </p>
      </div>
    </div>
  ))}
</div>

{/* Experience Section */}
<div className="mt-10">
  <h3 className="text-md font-bold border-b border-black mb-4">EXPERIENCE</h3>

  {(formData.experience || []).map((exp, index) => (
    <div key={index} className="mb-6 flex flex-col md:flex-row gap-3">
      
      {/* Timeline */}
      <div className="md:w-1/5 text-sm text-gray-700 font-medium">
        {exp.timeline || "x/2023 – x/2023"}
      </div>

      {/* Main Content */}
      <div className="md:w-4/5">
        <div className="flex justify-between items-start flex-wrap">
          <div className="font-bold">
            {exp.title || "Role Title"}
            {exp.tag && (
              <span className="ml-2 italic text-xs text-gray-500">({exp.tag})</span>
            )}
          </div>
          <div className="text-sm font-medium text-gray-700">
            {exp.company || "Company"}
          </div>
        </div>

        {/* Description */}
        <ul className="list-disc list-inside text-sm text-gray-800 mt-1  break-words whitespace-pre-wrap space-y-1">
  {(exp.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.")
    .split('\n') 
    .map((item, i) => (
      <li key={i}>{item}</li>
    ))}
</ul>


        {/* Skills */}
        {exp.skills && (
          <div className="text-sm font-semibold mt-1">{exp.skills}</div>
        )}
      </div>
    </div>
  ))}
</div>



<PDFDownloadLink
  document={<MyResumePDF formData={formData} />}
  fileName="my_resume.pdf"
>
  {({ loading }) =>
    loading ? (
      <button className="px-6 py-2 bg-gray-400 text-white rounded">Preparing PDF...</button>
    ) : (
      <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Download Resume as PDF
      </button>
    )
  }
</PDFDownloadLink>



    </div>
  );
};

export default RightPanel;

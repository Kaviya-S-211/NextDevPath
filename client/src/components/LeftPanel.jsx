import React from 'react';

const LeftPanel = ({ formData, setFormData }) => {

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  return (
    <div className="w-full md:w-1/2 p-4 md:p-6 border-b md:border-r border-white scrollbar-hide text-white font-sans overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Enter Your Details</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <input
        type="text"
        placeholder="Portfolio URL"
        value={formData.portfolio}
        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <input
        type="text"
        placeholder="GitHub URL"
        value={formData.github}
        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <input
        type="text"
        placeholder="LinkedIn URL"
        value={formData.linkedin}
        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <textarea
        placeholder="Summary"
        value={formData.summary}
        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
        rows={4}
      />

      <input
        type="text"
        placeholder="Languages (e.g. Java, Python)"
        value={formData.languages}
        onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <input
        type="text"
        placeholder="Technologies (e.g. Docker, GCP)"
        value={formData.technologies}
        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
        className="w-full p-2 mb-3 border-white border rounded bg-transparent text-white text-sm"
      />

      <h3 className="text-lg font-semibold mb-2">Projects</h3>

      {formData.projects.map((project, index) => (
        <div key={index} className="mb-4 border border-white p-3 rounded">
          <input
            type="text"
            placeholder={`Project ${index + 1} Title`}
            value={project.title}
            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
            className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white text-sm"
          />
          <input
            type="text"
            placeholder={`Project ${index + 1} Technologies`}
            value={project.technologies}
            onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
            className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white text-sm"
          />
          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
            className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white text-sm"
            rows={2}
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={project.github}
            onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
            className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white text-sm"
          />
        </div>
      ))}

      {/* Education Section */}
<h3 className="text-lg font-semibold mb-2 mt-6">Education</h3>
{formData.education.map((edu, index) => (
  <div key={index} className="mb-4 border border-white p-3 rounded">
    <input
      type="text"
      placeholder="Timeline (e.g., 3/2023 – x/2023)"
      value={edu.timeline}
      onChange={(e) => {
        const updated = [...formData.education];
        updated[index].timeline = e.target.value;
        setFormData({ ...formData, education: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
    />
    <input
      type="text"
      placeholder="Title (e.g., BSc Computer Science)"
      value={edu.title}
      onChange={(e) => {
        const updated = [...formData.education];
        updated[index].title = e.target.value;
        setFormData({ ...formData, education: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
    />
    <textarea
      placeholder="Description"
      value={edu.description}
      onChange={(e) => {
        const updated = [...formData.education];
        updated[index].description = e.target.value;
        setFormData({ ...formData, education: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
      rows={2}
    />
    <input
      type="text"
      placeholder="School"
      value={edu.school}
      onChange={(e) => {
        const updated = [...formData.education];
        updated[index].school = e.target.value;
        setFormData({ ...formData, education: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
    />
  </div>
))}


{/* Experience Section */}
<h3 className="text-lg font-semibold mb-2 mt-6">Experience</h3>
{formData.experience.map((exp, index) => (
  <div key={index} className="mb-4 border border-white p-3 rounded">
    <input
      type="text"
      placeholder="Timeline"
      value={exp.timeline}
      onChange={(e) => {
        const updated = [...formData.experience];
        updated[index].timeline = e.target.value;
        setFormData({ ...formData, experience: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
    />
    <input
      type="text"
      placeholder="Role Title"
      value={exp.title}
      onChange={(e) => {
        const updated = [...formData.experience];
        updated[index].title = e.target.value;
        setFormData({ ...formData, experience: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
    />
    <input
      type="text"
      placeholder="Tag (e.g. scholarship holder)"
      value={exp.tag}
      onChange={(e) => {
        const updated = [...formData.experience];
        updated[index].tag = e.target.value;
        setFormData({ ...formData, experience: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
    />
    <input
      type="text"
      placeholder="Company Name"
      value={exp.company}
      onChange={(e) => {
        const updated = [...formData.experience];
        updated[index].company = e.target.value;
        setFormData({ ...formData, experience: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
    />
    <textarea
      placeholder="Description (use line breaks for bullets)"
      value={exp.description}
      onChange={(e) => {
        const updated = [...formData.experience];
        updated[index].description = e.target.value;
        setFormData({ ...formData, experience: updated });
      }}
      className="w-full p-2 mb-2 border-white border rounded bg-transparent text-white"
      rows={3}
    />
    <input
      type="text"
      placeholder="Skills (e.g. SQL / Excel)"
      value={exp.skills}
      onChange={(e) => {
        const updated = [...formData.experience];
        updated[index].skills = e.target.value;
        setFormData({ ...formData, experience: updated });
      }}
      className="w-full p-2 border-white border rounded bg-transparent text-white"
    />
  </div>
))}


    </div>
  );
};

export default LeftPanel;

// ResumeBuilder.jsx
import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const ResumeBuilder = () => {

  const [formData, setFormData] = useState({
    name: '',
  email: '',
  summary: '',
  portfolio: '',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  languages: '',
  technologies: '',
  projects: [
    {
      title: 'My project 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac.',
      github: 'https://github.com/user/project1'
    },
    {
      title: 'My project 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac.',
      github: 'https://github.com/user/project2'
    },
    {
      title: 'My project 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac.',
      github: 'https://github.com/user/project3'
    },
    {
      title: 'My project 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac.',
      github: 'https://github.com/user/project4'
    }
  ],
  education: [
    {
      timeline: "3/2023 – x/2023",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description: "Enrolled, part time program for development",
      school: "School"
    },
    {
      timeline: "x/2023 – x/2023",
      title: "Professional Certificate",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      school: "School"
    },
    {
      timeline: "x/2023 – x/2023",
      title: "Certificate",
      description: "Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.",
      school: "School"
    },
    {
      timeline: "x/2023 – x/2023",
      title: "Engineer",
      description: "Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.",
      school: "School"
    }
  ],
  experience: [
    {
      timeline: "x/2023 – x/2023",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tag: "",
      company: "Company",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.
  Curabitur dictum gravida mauris. Nam arcu libero, nonummy eget, consectetuer id, vulputate a, magna.`,
      skills: "SQL / Excel"
    },
    {
      timeline: "x/2023 – x/2023",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tag: "",
      company: "Company",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.
  Curabitur dictum gravida mauris. Nam arcu libero, nonummy eget, consectetuer id, vulputate a, magna.`,
      skills: "SQL / Excel"
    },
    {
      timeline: "x/2023 – x/2023",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tag: "scholarship holder",
      company: "Company",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus elit, vestibulum ut, placerat ac, adipiscing vitae, felis.
  Curabitur dictum gravida mauris. Nam arcu libero, nonummy eget, consectetuer id, vulputate a, magna.`,
      skills: "SQL / Excel"
    }
  ]
  
  


  });
  

  return (
    <div className="flex h-screen mt-20">
      <LeftPanel formData={formData} setFormData={setFormData} />
      <RightPanel formData={formData} />
    </div>
  );
};

export default ResumeBuilder;

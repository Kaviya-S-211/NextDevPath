export const generateResume = async (req, res) => {
    const { data, templateId } = req.body;
  
    // generate PDF/HTML using data
    // you can use libraries like pdf-lib, react-pdf, puppeteer, etc.
    res.json({ success: true, link: "/resume.pdf" });
  };
  
  export const getTemplates = (req, res) => {
    const templates = [
      { id: "modern", name: "Modern Template" },
      { id: "classic", name: "Classic Resume" },
      { id: "minimal", name: "Minimal CV" },
    ];
    res.json(templates);
  };
  
  export const saveResume = async (req, res) => {
    const { userEmail, resumeData } = req.body;
  
    // Store to DB if needed
    res.json({ success: true });
  };
  
import React, { useEffect, useRef, useState } from "react";

export default function VirtualAgent() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
     if (location.protocol !== "https:" && location.hostname !== "localhost") {
      alert("Camera requires HTTPS to work in production.");
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access error:", err);
      });

    return () => {
       streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    const roadmap = JSON.parse(localStorage.getItem("premiumRoadmap"));
    const domainName = roadmap?.domains?.map(domain => domain.name).join(", ");
    console.log(domainName);  
    

    if (domainName) {
      fetchGeminiResponse(null, domainName);   
    }
  }, []);
  useEffect(() => {
  window.speechSynthesis.onvoiceschanged = () => {
    setAvailableVoices(window.speechSynthesis.getVoices());
  };
}, []);

  
  
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setUserInput(text);
      fetchGeminiResponse(text);
    };

    recognition.onerror = (e) => {
      console.error("Recognition error:", e.error);
      if (e.error === "network") {
        alert("🛑 Voice recognition needs an internet connection. Please try on HTTPS or check your network.");
      }
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const fetchGeminiResponse = async (userQuery, roadmapJson = null) => {
    let prompt = "";
  
     if (!userQuery && roadmapJson) {
      prompt = `
  The student is speaking to you for career advice. This is their roadmap: ${roadmapJson}.
  
  Analyze it briefly, and reply in 2–3 friendly sentences. Then say: "Where are you stuck or what would you like help with?"
  Respond like a helpful mentor. No code. Voice-friendly.
      `.trim();
    } else {
       prompt = `
  You are a helpful AI assistant. The student asked: "${userQuery}"
  Reply in plain, professional, 2–3 sentence voice-friendly tone with no code.
      `.trim();
    }
  
    try {
      const res = await fetch("http://localhost:4000/api/virtual-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await res.json();
      const reply = data.reply;
      setAIResponse(reply);
      speak(reply);
    } catch (err) {
      console.error("Gemini Error:", err);
      setAIResponse("Something went wrong.");
    }
  };
  
  

const speak = (text) => {
  const synth = window.speechSynthesis;

  const voices = synth.getVoices();
  const voice =
    voices.find((v) =>
      v.name.toLowerCase().includes("samantha") ||
      v.name.toLowerCase().includes("jenny") || // on Edge/Windows
      v.name.toLowerCase().includes("google us english female") ||
      v.name.toLowerCase().includes("female")
    ) || voices[0]; // fallback

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = "en-US";

   utterance.pitch = 1.15;     // Slightly expressive
  utterance.rate = 0.93;      // Slower = clearer
  utterance.volume = 1.0;     // Max volume

  // Optional: Add emphasis with pauses
  utterance.text = text.replace(/[,.;!?]/g, (m) => `${m} `);

  utterance.onstart = () => setSpeaking(true);
  utterance.onend = () => setSpeaking(false);
  speechRef.current = utterance;
  synth.cancel(); // cancel previous to prevent overlap
  synth.speak(utterance);
};

  

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <section className="min-h-screen grid grid-rows-2 md:grid-rows-none md:grid-cols-2 p-6 gap-6 bg-[#0a0a0a] text-white">

      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center shadow-xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="rounded-xl border border-white/20 w-full max-w-sm aspect-video object-cover"
        />
        <p className="mt-4 text-lg text-gray-300"> Camera On You're Live!</p>
      </div>

      {/* Voice Agent Panel */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        <div className="space-y-4 overflow-y-auto max-h-[300px] scrollbar-hide">
          <p className="text-gray-400 text-sm">You:</p>
          <p className="text-lg font-medium">{userInput || "Say something..."}</p>

          <p className="text-gray-400 text-sm mt-6">Agent:</p>
          <p className="text-lg font-semibold text-blue-300">{aiResponse}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={startListening}
            className={`px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition text-white font-semibold ${listening ? "animate-pulse" : ""}`}
          >
            {listening ? "Listening..." : "Ask Your Assistant"}
          </button>

          {speaking && (
            <button
              onClick={stopSpeaking}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition text-white font-semibold"
            >
              Stop 
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

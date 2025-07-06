import React, { useEffect, useRef, useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);

  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 1600, y: 750 });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const welcomeShown = localStorage.getItem("welcomeMessageShown");
    if (!welcomeShown) {
      setMessages([{ sender: "ai", text: "Hey bro, this is Codebyabi 😎" }]);
      setHasUnread(false);
      localStorage.setItem("welcomeMessageShown", "false");
    }
  }, []);

  
useEffect(() => {
  setScreenWidth(window.innerWidth);

  const handleResize = () => setScreenWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const handleMouseDown = (e) => {
    if (screenWidth <= 768) return;  
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };
  

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { sender: "user", text: input , userInfo: localStorage.getItem("roadmap") || "" };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ prompt: input, userInfo: localStorage.getItem("roadmap") || "" }),
      });

      const data = await res.json();
      const aiMessage =
        typeof data.reply === "object"
          ? JSON.stringify(data.reply, null, 2)
          : data.reply;

      setMessages((prev) => [...prev, { sender: "ai", text: aiMessage }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Failed to respond" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "fixed",
          ...(screenWidth > 768
            ? { left: position.x, top: position.y }
            : { bottom: "20px", right: "24px" }
          ),
          cursor: "grab",
        }}
        
        
        className="w-14 h-14 rounded-full shadow-lg bg-blue-600 flex items-center justify-center z-50 hover:scale-105 transition-all"
        onClick={() => {
          setOpen(!open);
          setHasUnread(false);
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="AI Bot"
          className="w-8 h-8"
        />
        {hasUnread && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 w-[90vw] max-w-xs md:right-6 md:left-auto md:w-full md:max-w-sm z-50">
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-xl max-h-[65vh] overflow-y-auto space-y-2 transition-all">
            <div className="flex justify-end mb-1">
              <button
                onClick={() => setOpen(false)}
                className="text-white text-sm hover:text-red-400"
                title="Close"
              >
                ✖
              </button>
            </div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm px-3 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white text-right"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <p className="text-xs text-gray-400">Typing...</p>}
          </div>

          <form onSubmit={handleSubmit} className="mt-2 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-black/20 backdrop-blur-md border border-white/10 text-white p-2 rounded-l-lg placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

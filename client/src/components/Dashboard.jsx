import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ setRoadmap }) {
  const [sessions, setSessions] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setUserEmail(data.email);
        setSessions(data.sessions || []);
        setEnquiries(data.enquiries || []);
      } catch (err) {
        console.error("Dashboard error:", err.message);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <section className="min-h-screen px-6 py-20 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">Welcome, {userEmail}</h1>
      <p className="text-gray-400 mb-12">Here’s your saved roadmap sessions and past enquiries.</p>

      {/* Roadmap Sessions */}
      <div className="mb-16">
        <h2 className="text-blue-400 text-2xl font-semibold mb-6">Your Roadmap History</h2>

        {sessions.length === 0 ? (
          <p className="text-gray-500">No roadmaps found yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl p-5 space-y-3"
              >
                <p className="text-sm text-gray-300">
                  <strong>Skills:</strong> {s.skills}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(s.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => {
                    setRoadmap(s.roadmap);
                    navigate("/result");
                  }}
                  className="text-blue-400 underline text-sm"
                >
                  View This Roadmap →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enquiries */}
      <div>
        <h2 className="text-green-400 text-2xl font-semibold mb-6">Your Enquiries</h2>

        {enquiries.length === 0 ? (
          <p className="text-gray-500">No enquiries submitted yet.</p>
        ) : (
          <div className="space-y-6">
            {enquiries.map((e) => (
              <div
                key={e.id}
                className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl p-5"
              >
                <p className="text-white font-semibold">{e.name}</p>
                <p className="text-sm text-blue-300">{e.email}</p>
                <p className="text-gray-300 mt-2 whitespace-pre-wrap">{e.message}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(e.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

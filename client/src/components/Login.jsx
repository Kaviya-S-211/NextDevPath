// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [status, setStatus] = useState("idle");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("loading");
//     setError("");

//     try {
//       const res = await fetch("http://localhost:4000/api/auth", {
        
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),

//       });

//       const data = await res.json();
//       console.log("All data",data);

//       if (!res.ok || !data.token) {
//         setError(data.message || "Login failed");
//         setStatus("error");
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userEmail", data.user.email);
//       setStatus("success");
//       navigate("/fillform");
//     } catch (err) {
//       setError("Something went wrong");
//       setStatus("error");
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white">
//         <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Login or Register</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             value={form.email}
//             onChange={handleChange}
//             className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={form.password}
//             onChange={handleChange}
//             className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             type="submit"
//             disabled={status === "loading"}
//             className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl text-lg font-semibold disabled:opacity-50"
//           >
//             {status === "loading" ? "Checking..." : "Continue"}
//           </button>

//           {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Login;

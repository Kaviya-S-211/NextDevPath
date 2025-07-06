import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentSuccess() {
  const [params]   = useSearchParams();
  const sessionId  = params.get("session_id");   // Stripe will inject this
  const plan       = params.get("plan") || "";
  const [status, setStatus] = useState("verifying"); // verifying | success | failed

  useEffect(() => {
    // (optional) double‑check with your backend that the session is paid
    if (!sessionId) return setStatus("success"); // fallback for dev
    axios
      .get(`http://localhost:4000/api/stripe/session/${sessionId}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("failed"));
  }, [sessionId]);

  if (status === "verifying") return <p className="text-white p-10">Verifying payment…</p>;
  if (status === "failed")    return <p className="text-red-500 p-10">Payment could not be verified.</p>;

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      {plan && <p className="text-xl mb-6">You’re now on the <b>{plan}</b> plan.</p>}
      <Link to="/fillform" className="bg-blue-600 px-6 py-3 rounded-xl">Go to Your RoadMap</Link>
    </div>
  );
}

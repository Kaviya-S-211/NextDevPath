// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import { useNavigate } from "react-router-dom";

// const plans = [
//   {
//     name: "Free", price: "₹0", amount: 0, button: "Get Started", highlight: false,
//     desc: "For students & beginners",
//     features: ["Basic Roadmaps", "Access to Testimonials", "PDF Export"]
//   },
//   {
//     name: "Pro", price: "₹499/mo", amount: 499, button: "Upgrade to Pro", highlight: true,
//     desc: "For serious learners & devs",
//     features: ["AI Domain Recommendations", "Advanced Projects & Roadmaps", "Priority Support", "Early Access to Updates"]
//   },
//   {
//     name: "Ultimate", price: "₹999/mo", amount: 999, button: "Go Ultimate", highlight: false,
//     desc: "For teams & organizations",
//     features: ["Team Dashboard", "Collaboration Tools", "Roadmap Analytics", "Custom AI Assistant", "Everything in Pro"]
//   },
// ];

// export default function PricingPlans() {
//   const [userPlan, setUserPlan] = useState("free");
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("userEmail");

//   const freezeUntil = Number(localStorage.getItem("upgradeFreezeUntil") || 0);
//   const upgradesFrozen = Date.now() < freezeUntil;

//   useEffect(() => {
//     async function fetchUserPlan() {
//       if (!userEmail) return;
//       try {
//         const res = await axios.get(`http://localhost:4000/api/get-user-plan?email=${userEmail}`);
//         setUserPlan(res.data.plan);
//         localStorage.setItem("plan", res.data.plan);
//       } catch (err) {
//         console.error("Failed to fetch user plan:", err);
//       }
//     }
//     fetchUserPlan();
//   }, [userEmail]);

//   useEffect(() => {
//     if (!window.Razorpay) {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   const checkout = async (plan) => {
//     if (!userEmail) return;
//     console.log("Selected plan:", plan.name);
//     console.log("User Email:", userEmail);

//     try {
//       const { data } = await axios.post("http://localhost:4000/api/razorpay/order", {
//         amount: plan.amount,
//         plan: plan.name,
//         userEmail,
//       });

//       const options = {
//         key: data.key,
//         amount: plan.amount * 100,
//         currency: "INR",
//         name: "CodeCred",
//         description: plan.name,
//         order_id: data.orderId,
//         handler: async (response) => {
//           await axios.post("http://localhost:4000/api/razorpay/verify", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             userEmail,
//             plan: plan.name,
//           });


//           const newFreeze = Date.now() + 30 * 24 * 60 * 60 * 1000;
//           localStorage.setItem("upgradeFreezeUntil", newFreeze.toString());
//           localStorage.setItem("plan", plan.name.toLowerCase());
//           const creditPoints = {
//             Free: 5,
//             Pro: 50,
//             Ultimate: 100
//           };
//           localStorage.setItem("creditPoints", creditPoints[plan.name]);

//           navigate(`/payment-success?gateway=razorpay&plan=${plan.name}`, { replace: true });
//         },
//         theme: { color: "#2563eb" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error("Razorpay checkout error:", err);
//     }
//   };

//   const checkoutStripe = async (plan) => {
//     if (!plan.amount) return;
//     try {
//       const { data } = await axios.post("http://localhost:4000/api/stripe/session", {
//         amount: plan.amount,
//         plan: plan.name,
//       });

//       const creditPoints = {
//         Free: 5,
//         Pro: 50,
//         Ultimate: 100
//       };
//       localStorage.setItem("creditPoints", creditPoints[plan.name]);

//       const stripe = await loadStripe(data.publishableKey);
//     await stripe.redirectToCheckout({ sessionId: data.sessionId });
//   } catch (err) {
//     console.error("Stripe checkout error:", err);
//   }
// };
 

//   return (
//     <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-white text-center">
//       <h2 className="text-4xl mb-4 text-blue-500 tracking-tight font-bold">Choose Your Plan</h2>
//       <p className="text-gray-400 mb-16 tracking-tight font-bold">No hidden fees. Cancel anytime.</p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//       {plans.map((p) => {
// const isCurrentPlan = p.name.toLowerCase() === userPlan.toLowerCase();
// const showFrozenMessage = upgradesFrozen && isCurrentPlan && p.name.toLowerCase() !== "free";
// const isFrozenAndAttemptingUpgrade = upgradesFrozen && !isCurrentPlan;

//   return (
//     <div key={p.name} className={`p-8 rounded-3xl border backdrop-blur-xl transition ${
//       p.highlight ? "border-blue-500 bg-blue-500/10 shadow-lg scale-105"
//                   : "border-white/10 bg-white/5"
//     }`}>
//       <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
//       <p className="text-4xl font-extrabold text-blue-400 mb-4">{p.price}</p>
//       <p className="text-sm text-gray-300 mb-6">{p.desc}</p>

//       <ul className="text-left text-sm space-y-2 mb-8">
//         {p.features.map((f) => (
//           <li key={f} className="text-gray-200 flex items-start gap-2">✅ {f}</li>
//         ))}
//       </ul>

//       {isCurrentPlan ? (
//   <button
//     className={`w-full py-3 rounded-xl font-semibold ${
//       showFrozenMessage
//         ? "bg-gray-500 text-white cursor-not-allowed"
//         : "bg-green-600 text-white"
//     }`}
//     disabled={showFrozenMessage}
//   >
//     {showFrozenMessage ? "Come back in 30 days" : "Already Purchased"}
//   </button>
// ) : (
//   p.amount > 0 && (
//     <div className="space-y-2">
//       <button
//         onClick={() => checkout(p)}
//         disabled={isFrozenAndAttemptingUpgrade}
//         className={`w-full py-3 rounded-xl font-semibold ${
//           isFrozenAndAttemptingUpgrade
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700 text-white"
//         }`}
//       >
//         {isFrozenAndAttemptingUpgrade ? "Come back in 30 days" : p.button}
//       </button>

//       <button
//         onClick={() => checkoutStripe(p)}
//         className="bg-gray-800 hover:bg-gray-900 w-full py-3 rounded-xl text-white font-semibold"
//       >
//         Pay with Card (Stripe)
//       </button>
//     </div>
//   )
// )}

//     </div>
//   );
// })}

//       </div>
//     </section>
//   );
 
// }
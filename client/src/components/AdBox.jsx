// import { useEffect, useRef } from "react";

// const AdBox = () => {
//   const adContainerRef = useRef(null);

//   useEffect(() => {
//     const container = adContainerRef.current;
//     if (!container) return;

//     // Clear previous content
//     container.innerHTML = "";

//     // Check if script already exists in document
//     const existingScript = document.getElementById("profitablerate-script");
//     if (existingScript) {
//       container.appendChild(existingScript);
//       return;
//     }

//     // Create new script element
//     const script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "//pl26811830.profitableratecpm.com/1f/28/91/1f2891b4f9ccad9771e537aa4dc38998.js";
//     script.async = true;
//     script.id = "profitablerate-script";

//     container.appendChild(script);

//     return () => {
//       // Cleanup: remove script if it exists
//       const scriptToRemove = document.getElementById("profitablerate-script");
//       if (scriptToRemove && scriptToRemove.parentNode === container) {
//         container.removeChild(scriptToRemove);
//       }
//     };
//   }, []);

//   return (
//     <div className="text-white p-4 rounded-lg shadow-md border border-gray-700 my-6">
//       <h3 className="text-lg font-semibold mb-2">Sponsored Ad</h3>
//       <div
//         ref={adContainerRef}
//         id="ad-container"
//         className="min-h-[120px] w-full text-center text-sm italic text-gray-400"
//       >
//         {/* Fallback content */}
//         <p>Loading advertisement...</p>
//       </div>
//     </div>
//   );
// };

// export default AdBox;
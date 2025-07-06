import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkToken = () => {
  //     const encrypted = localStorage.getItem("token");
  
  //     if (!encrypted) {
  //       setIsLoggedIn(false);
  //       return;
  //     }
  
  //     try {
  //       const bytes = CryptoJS.AES.decrypt(encrypted, "my-encryption-key");
  //       const token = bytes.toString(CryptoJS.enc.Utf8);
  //       setIsLoggedIn(!!token);
  //     } catch (err) {
  //       console.error("🔐 Token decryption failed:", err.message);
  //       setIsLoggedIn(false);
  //     }
  //   };
  
  //   checkToken(); 
  
  //   window.addEventListener("storage", checkToken);
  //   const observer = new MutationObserver(checkToken);
  //   observer.observe(document.body, { childList: true, subtree: true });
  
  //   window.dispatchEvent(new Event("storage"));
  
  //   return () => {
  //     window.removeEventListener("storage", checkToken);
  //     observer.disconnect();
  //   };
  // }, []);
  
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.clear()

    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-[1px] px-6 py-4 flex justify-between items-center">
      {/* Brand Logo */}
      <div className="text-blue-400 text-xl font-extrabold tracking-tight">
        <Link to="/" onClick={()=> localStorage.clear()}>NextDevPath</Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 text-white text-sm font-medium items-center">
        <li className="hover:text-blue-400 transition">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-blue-400 transition">
          <Link to="/fillform">Dream</Link>
        </li>
        <li className="hover:text-blue-400 transition">
          <Link to="/assistant">Assistant</Link>
        </li>
        <li className="hover:text-blue-400 transition">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:text-blue-400 transition">
          <Link to="/contact">Contact</Link>
        </li>
        {/* <li className="hover:text-blue-400 transition">
          <Link to="/pricing">Pricing</Link>
        </li> */}
        {/* {isLoggedIn ? (
          <>
            <li className="hover:text-blue-400 transition">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </li>
        )} */}
      </ul>

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white focus:outline-none"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full backdrop-blur-md px-6 py-6 space-y-4 md:hidden z-50 bg-black/80 border-t border-white/10">
          <Link to="/" onClick={toggleMenu} className="block text-white hover:text-blue-400">Home</Link>
          <Link to="/fillform" onClick={toggleMenu} className="block text-white hover:text-blue-400">Dream</Link>
          <Link to="/assistant" onClick={toggleMenu} className="block text-white hover:text-blue-400">Assistant</Link>
          <Link to="/about" onClick={toggleMenu} className="block text-white hover:text-blue-400">About</Link>
          <Link to="/contact" onClick={toggleMenu} className="block text-white hover:text-blue-400">Contact</Link>
          {/* <Link to="/pricing" onClick={toggleMenu} className="block text-white hover:text-blue-400">Pricing</Link> */}
          {/* {isLoggedIn ? (
            <>
              <Link to="/dashboard" onClick={toggleMenu} className="block text-white hover:text-blue-400">Dashboard</Link>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="block text-white hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="block text-white hover:text-blue-400">
              Login
            </Link>
          )} */}
        </div>
      )}
    </nav>
  );
}

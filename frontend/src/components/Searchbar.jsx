// import React, { useState } from 'react'
// import { 
//   FaSearch, FaMicrophone, FaHome, FaTrophy, FaShoppingCart, 
//   FaHistory, FaHeart, FaCode, FaComments 
// } from "react-icons/fa";


// const Searchbar = () => {

//     const [searchQuery, setSearchQuery] = useState("");

//     const handleVoiceSearch = () => {
//       const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//       recognition.onresult = (event) => {
//         setSearchQuery(event.results[0][0].transcript);
//       };
//       recognition.start();
//     };

//   return (
//     <div>
//        {/* Search Bar */}
//        <div className="flex items-center bg-white p-3 rounded-lg shadow-md w-full max-w-lg mx-auto">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="What are you searching for?"
//             className="w-full outline-none px-3 rounded-lg"
//           />
//           <button className="p-2"><FaSearch /></button>
//           <button onClick={handleVoiceSearch} className="p-2"><FaMicrophone /></button>
//         </div>
//     </div>
//   )
// }

// export default Searchbar

import React, { useState, useRef, useEffect } from "react";
import { Search, Mic, X } from "lucide-react";
import { Link } from "react-router-dom";

const dummyData = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
  { name: "Notifications", path: "/notifications" },
  { name: "Help Center", path: "/help" },
  { name: "Search Engine", path: "/search" },
  { name: "Reports", path: "/reports" },
  { name: "User Management", path: "/users" },
  { name: "Purchases", path: "/purchases" },
  { name: "Java", path: "/purchases" },
  { name: "C++ language", path: "/purchases" },
  { name: "C language" || "C", path: "/purchases" },
  { name: "Python language", path: "/purchases" },
 
];

const Searchbar = ({ autoFocus, onClose }) => {
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in your browser.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onerror = () => setListening(false);
      recognitionRef.current.onend = () => setListening(false);
    }

    setListening(true);
    recognitionRef.current.start();
  };

  useEffect(() => {
    if (input.trim() === "") {
      setFilteredData([]);
    } else {
      const matches = dummyData.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredData(matches);
    }
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFilteredData([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-full md:max-w-md mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-lg px-3 py-2 w-full border border-gray-400 focus-within:ring-2 focus-within:ring-blue-400 transition">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          autoFocus={autoFocus}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 px-2 bg-transparent"
        />
        <button
          onClick={handleVoiceInput}
          className={`ml-2 ${listening ? "animate-pulse text-blue-500" : "text-gray-500"}`}
          aria-label="Voice Search"
        >
          <Mic className="w-4 h-4" />
        </button>
        {onClose && (
          <button onClick={onClose} className="ml-2 text-gray-500 hover:text-red-500" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {filteredData.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          {filteredData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setInput("")}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;

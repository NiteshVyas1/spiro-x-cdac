import React, { useState } from 'react'
import { 
  FaSearch, FaMicrophone, FaHome, FaTrophy, FaShoppingCart, 
  FaHistory, FaHeart, FaCode, FaComments 
} from "react-icons/fa";


const Searchbar = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleVoiceSearch = () => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.onresult = (event) => {
        setSearchQuery(event.results[0][0].transcript);
      };
      recognition.start();
    };

  return (
    <div>
       {/* Search Bar */}
       <div className="flex items-center bg-white p-3 rounded-lg shadow-md w-full max-w-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What are you searching for?"
            className="w-full outline-none px-3 rounded-lg"
          />
          <button className="p-2"><FaSearch /></button>
          <button onClick={handleVoiceSearch} className="p-2"><FaMicrophone /></button>
        </div>
    </div>
  )
}

export default Searchbar

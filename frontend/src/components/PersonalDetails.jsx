import React, { useState, useContext, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const PersonalDetails = () => {
  const { userName, userEmail, setUserName, setUserEmail, userId } = useContext(ShopContext);
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(""); // Default phone value
  const [branch, setBranch] = useState(""); // Default branch value
  const [age, setAge] = useState(""); // Default age value
  const [education, setEducation] = useState(""); // Default education value
  const [github , setGithub] = useState(""); // Default github value
  const [linkedin , setLinkedin] = useState(""); // Default linkedin value  


  useEffect(() => {
    if (!editing && userId) { // Use userId from ShopContext
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/user/get-profile/${userId}`); 
          const { phone, branch, age, education, github, linkedin } = response.data;
  
          setPhone(phone || "");
          setBranch(branch || "");
          setAge(age || "");
          setEducation(education || "");
          setGithub(github || "");
          setLinkedin(linkedin || "");
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
  
      fetchUserProfile();
    } else if (!userId) {
      console.error("User ID is missing or undefined.");
    }
  }, [editing, userId]); 

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);

    // Reset state values if canceled
    setPhone("");
    setBranch("");
    setAge("");
    setEducation("");
    setGithub("");
    setLinkedin("");
  };

  const handleSaveClick = async () => {
    // Send the updated details to the backend
    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/update-profile/${userId}`,  // Use userId for identification
        { phone, branch, age, education, github, linkedin }
      );

      if (response.status === 200 || response.status === 201) {
        setEditing(false); // Close the form after saving

        // Optionally update context and localStorage if needed
        setUserName(userName);
        setUserEmail(userEmail);
        localStorage.setItem("name", userName);
        localStorage.setItem("email", userEmail);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Personal Details</h2>
        {!editing && (
          <Pencil className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200" onClick={handleEditClick} />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        {!editing ? (
          <>
            <div>
              <span className="text-gray-500 uppercase tracking-wide">Name</span>
              <p className="mt-1 text-gray-900">{userName || "Student"}</p>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wide">College Email</span>
              <p className="mt-1 text-gray-900">{userEmail || "Student Email"}</p>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wide">Phone</span>
              <p className="mt-1 text-gray-900">{phone || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wide">Branch</span>
              <p className="mt-1 text-gray-900">{branch || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wide">Age</span>
              <p className="mt-1 text-gray-900">{age || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wide">Education</span>
              <p className="mt-1 text-gray-900">{education || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wide">Github</span>
              <p className="mt-1 text-blue-600 underline cursor-pointer">{github || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wide">LinkedIn</span>
              <p className="mt-1 text-blue-600 underline cursor-pointer">{linkedin || "Not Provided"}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-gray-500 uppercase tracking-wide">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-500 uppercase tracking-wide">Branch</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-500 uppercase tracking-wide">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-500 uppercase tracking-wide">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-500 uppercase tracking-wide">Github Link</label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-500 uppercase tracking-wide">LinkedIn Link</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSaveClick}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="text-gray-500 py-2 px-6 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;

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
    <div className="bg-white rounded-lg shadow p-6 mr-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Personal detail</h2>
        {!editing && (
          <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={handleEditClick} />
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
        {!editing ? (
          <>
            <div>
              <span className="text-gray-500">Name</span>
              <p>{userName || "Student"}</p>
            </div>
            <div>
              <span className="text-gray-500">College Email</span>
              <p>{userEmail || "Student Email"}</p>
            </div>
            <div>
              <span className="text-gray-500">Phone</span>
              <p>{phone || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">Branch</span>
              <p>{branch || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">Age</span>
              <p>{age || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">Education</span>
              <p>{education || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">Github</span>
              <p>{github || "Not Provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">LinkedIn</span>
              <p>{linkedin || "Not Provided"}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-gray-500">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-500">Branch</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-500">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-500">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-500">Github Link</label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-500">LinkedIn Link</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleSaveClick}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="text-gray-500 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
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

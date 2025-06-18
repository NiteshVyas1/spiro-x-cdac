import React, { useContext } from "react";
import { Github, Mail, Linkedin } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const ProfileSideBar = () => {
  const { userEmail, userName, userInitial, userGithub, userLinkedin } = useContext(ShopContext);

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow p-6 flex flex-col items-center space-y-6">
      <div className="w-40 h-40 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg">
        {userInitial || (userName ? userName.charAt(0).toUpperCase() : "U")}
      </div>

      <h2 className="text-2xl font-extrabold text-gray-900">{userName || "User Name"}</h2>

      <div className="flex flex-col space-y-3 mt-6 w-full">
        <a
          href={userGithub ? `https://github.com/${userGithub}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          <Github className="w-5 h-5" />
          <span className="truncate">{userGithub || "GitHub Username"}</span>
        </a>
        <div className="flex items-center space-x-3 text-gray-700">
          <Mail className="w-5 h-5" />
          <span className="truncate">{userEmail || "Email not provided"}</span>
        </div>
        <a
          href={userLinkedin ? `https://linkedin.com/in/${userLinkedin}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          <Linkedin className="w-5 h-5" />
          <span className="truncate">{userLinkedin || "LinkedIn Username"}</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileSideBar;

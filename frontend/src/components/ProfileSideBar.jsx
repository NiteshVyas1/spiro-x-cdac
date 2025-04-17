import React, { useContext } from "react";
import { Github, Mail, Linkedin } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const ProfileSideBar = () => {
  const { userEmail, userName, userInitial, userGithub, userLinkedin } = useContext(ShopContext);

  return (
    <div className="w-1/5 bg-white rounded-lg shadow p-4 flex flex-col items-center space-y-4 ml-20 ">
      <div className="w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-semibold text-white">
        {userInitial || userName.charAt(0).toUpperCase()} {/* Fallback to the first letter of the name */}
      </div>

      <h2 className="text-xl font-bold">{userName}</h2>
     
      <div className="flex flex-col space-y-2 mt-14">
        <div className="flex items-center space-x-2 text-sm">
          <Github className="w-4 h-4" />
          <span>{userGithub || "GitHub Username"}</span> {/* Use dynamic GitHub username */}
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Mail className="w-4 h-4" />
          <span>{userEmail}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Linkedin className="w-4 h-4" />
          <span>{userLinkedin || "LinkedIn Username"}</span> {/* Use dynamic LinkedIn username */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;

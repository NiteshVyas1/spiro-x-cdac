import React from "react";
import { Github, Mail, Linkedin } from "lucide-react";

const ProfileSideBar = () => {
  return (
    <div className="w-1/5 bg-white rounded-lg shadow p-4 flex flex-col items-center space-y-4 ml-20 mb-25">
      <div className="w-40 h-40 bg-gray-200 rounded-full" />
      <h2 className="text-xl font-bold">Vedangi Mhatre</h2>
      <button className="text-sm text-blue-600">
        Update profile visibility
      </button>

      <div className="flex flex-col space-y-2 mt-14">
        <div className="flex items-center space-x-2 text-sm">
          <Github className="w-4 h-4" />
          <span>vedangi</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Mail className="w-4 h-4" />
          <span>vedangi@gmail.com</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Mail className="w-4 h-4" />
          <span>vedanji@gmail.com</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Linkedin className="w-4 h-4" />
          <span>vedangi</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;

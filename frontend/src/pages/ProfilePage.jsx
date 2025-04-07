import React from "react";
import ProfileSideBar from "../components/ProfileSideBar";
import PersonalDetails from "../components/PersonalDetails";
import ProfileCourseOveriew from "../components/ProfileCourseOveriew";
import ProfileCertificationStatus from "../components/ProfileCertificationStatus";
import TopBar from "../components/TopBar";

const ProfilePage = () => {
  return (
    <div>
      <TopBar />

      <div className="flex min-h-screen bg-gray-100 p-4 space-x-4">
        <ProfileSideBar />
        <div className="flex-1 space-y-4">
          <PersonalDetails />
          <ProfileCourseOveriew />
          <ProfileCertificationStatus />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

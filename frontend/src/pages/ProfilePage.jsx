import React from "react";
import ProfileSideBar from "../components/ProfileSideBar";
import PersonalDetails from "../components/PersonalDetails";
import ProfileCourseOverview from "../components/ProfileCourseOveriew";
import ProfileCertificationStatus from "../components/ProfileCertificationStatus";
import TopBar from "../components/TopBar";


const ProfilePage = () => {
  return (
    <div>
      <TopBar />
      <div className="flex min-h-screen bg-gray-100 p-6 space-x-6 max-w-7xl mx-auto">
        <ProfileSideBar />
        <div className="flex-1 space-y-6">
          <PersonalDetails />
          <ProfileCourseOverview />
          <ProfileCertificationStatus />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

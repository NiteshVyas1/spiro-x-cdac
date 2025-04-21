// src/pages/PurchasesPage.jsx
import React from "react";
import RecommendationCard from "../components/RecommendationCard";
import MyCourses from "./MyCourses";

const PurchasesPage = () => {

  return (
    <div className="flex-1 p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 underline">Purchases</h2>

      {/* Recommendations Section */}
      <RecommendationCard />

      {/* Past Purchases Section */}
      <MyCourses />
    </div>
  );
};

export default PurchasesPage;

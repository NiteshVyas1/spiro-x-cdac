// src/pages/PurchasesPage.jsx
import React from "react";
import { assets } from "../assets/assets";
import RecommendationCard from "../components/RecommendationCard";
import MyCourses from "./MyCourses";

// const pastPurchases = [
//   {
//     name: "C Programming",
//     institute: "CDAC Gist Pace Jai Enterprises Chembur Computer Institute",
//     date: "27th March'25",
//     image: assets.c,
//   },
//   {
//     name: "Python",
//     institute: "CDAC Gist Pace Jai Enterprises Chembur Computer Institute",
//     date: "24th March'25",
//     image: assets.python,
//   },
// ];


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

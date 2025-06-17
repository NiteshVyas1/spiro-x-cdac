import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import CoursePage from "./pages/CoursePage";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import TopBar from "./components/TopBar";
import LecturePage from "./pages/LecturePage";
import PurchasesPage from "./pages/PurchasesPage";
import Sidebar from "./components/Sidebar";
import HistoryPage from "./pages/HistoryPage";
import Cart from "./pages/Cart";
import MyCourses from "./pages/MyCourses";
import Watchlist from "./pages/Watchlist";
import QuizPage from "./pages/QuizPage";

const App = () => {
  const location = useLocation();

  const noLayoutRoutes = [
    "/login",
    "/signup",
    "/login/resetpassword",
    "/signup/verify-otp",
    "/profile",
  
  ];

  const hideLayout = noLayoutRoutes.includes(location.pathname.toLowerCase());
  const showFooter = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-left" autoClose={2500} theme="colored" />

      {!hideLayout && <TopBar />}

      {hideLayout ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/resetpassword" element={<ResetPassword />} />
          <Route path="/signup/verify-otp" element={<VerifyOtp />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      ) : (
        <div className="flex flex-1 flex-col md:flex-row">
          <Sidebar />
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/course/:courseId/:lectureId" element={<LecturePage />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/quiz" element={<QuizPage />} />


          </Routes>
        </div>
      )}

      {showFooter && <Footer />}
    </div>
  );
};

export default App;

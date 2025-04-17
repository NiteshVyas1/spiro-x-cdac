import React from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import CoursePage from './pages/coursepage';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import GenerateOtp from './pages/GenerateOtp';
import VerifyOtp from './pages/VerifyOtp';
import TopBar from './components/TopBar';
import LecturePage from './pages/LecturePage';
import PurchasesPage from './pages/PurchasesPage';
import Sidebar from './components/Sidebar';
import HistoryPage from './pages/HistoryPage';
import Cart from './pages/Cart';
import MyCourses from './pages/MyCourses';

const App = () => {
  const location = useLocation();
  const showFooter = location.pathname === "/";
  return (
  <div className="flex flex-col min-h-screen">
    <ToastContainer 
            position="top-left"
            autoClose={2500} 
            theme='colored'/>
    <TopBar />
      <div className="flex flex-1"> 
        <Sidebar />
       <Routes>
    
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/course/:id" element={<CoursePage/>} />
        <Route path="/course/:courseId/:lectureId" element={<LecturePage />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/login/ResetPassword" element={<ResetPassword />} />
        <Route path="/generate-otp" element={<GenerateOtp />} />
        <Route path="/generate-otp/verify-otp" element={<VerifyOtp />} />

       </Routes>
    </div> 
    
      {/* Footer - only on home page */}
      {showFooter && <Footer />}
  </div>
  )
}

export default App

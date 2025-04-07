import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import CoursePage from './pages/coursepage';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import Purchase from './pages/Purchase';

const App = () => {
  console.log("App component rendered")
  return (
    <div>

    <ToastContainer />

    <Routes>
    
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/course/:id" element={<CoursePage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/purchase" element={<Purchase />}/>

    </Routes>

    <Footer />
      
    </div>
  )
}

export default App

import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import CoursePage from './pages/coursepage';
import Login from './pages/Login';

const App = () => {
  console.log("App component rendered")
  return (
    <div>

    <ToastContainer />

    <Routes>
    
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/course/:id" element={<CoursePage/>} />
      <Route path="/login" element={<Login />} />

    </Routes>
      
    </div>
  )
}

export default App

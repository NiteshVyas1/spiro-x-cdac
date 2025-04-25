
// CartContext.jsx

import React, { createContext, useContext, useState } from 'react';
import { courses } from '../assets/assets';
import courseVideos from '../assets/courseVideos';
import axios from 'axios';
import { ShopContext } from './ShopContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  const { userId } = useContext(ShopContext); // ✅ Fetch userId from global context
  
  const addToCart = (course) => {
    setCartItems(prev => {
      if (prev.find(item => item.name === course.name)) return prev;
      return [...prev, course];
    });
  };

  const removeFromCart = (courseName) => {
    setCartItems(prev => prev.filter(item => item.name !== courseName));
  };

  const clearCart = () => setCartItems([]);

  const purchaseCourses = async (courseList) => {
    const enrichedCourses = courseList.map(course =>
      courses.find(c => c._id === course._id) || course
    );
    
    setPurchasedCourses(prev => {
      const newCourses = enrichedCourses.filter(
        newCourse => !prev.find(p => p._id === newCourse._id)
      );
      return [...prev, ...newCourses];
    });
        // // ✅ Send to backend for persistence
        // try {
        //   await axios.post(`http://localhost:4000/api/user/purchase/${userId}`, {
        //     courses: enrichedCourses.map(c => ({
        //       courseId: c._id,
        //       name: c.name,
        //       image: c.image,
        //     })),
        //   });
        // } catch (err) {
        //   console.error("Error saving purchases to backend:", err);
        // }
  
    clearCart();
  };

  // const purchaseCourses = async (courseList) => {
  //   const enrichedCourses = courseList.map(course =>
  //     courses.find(c => c._id === course._id) || course
  //   );
  
  //   const newCourses = enrichedCourses.filter(
  //     (newCourse) => !purchasedCourses.find((p) => p._id === newCourse._id)
  //   );
  
  //   setPurchasedCourses((prev) => [...prev, ...newCourses]);
  //   clearCart();
  
  //   // 🟡 Send to backend
  //   try {
  //     await axios.post("http://localhost:4000/api/user/purchase", {
  //       userId,
  //       courses: newCourses,
  //     });
  //   } catch (error) {
  //     console.error("Error saving purchased courses:", error);
  //   }
  // };

  const markAsWatching = (video) => {
    setContinueWatching((prev) => {
      if (prev.find((v) => v.id === video.id)) return prev;
      return [...prev, video];
    });
  };
  


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart , clearCart, purchaseCourses, purchasedCourses , markAsWatching, continueWatching }}>
      {children}
    </CartContext.Provider>
  );
};


// CartContext.jsx

import React, { createContext, useContext, useState } from 'react';
import { courses } from '../assets/assets';
import courseVideos from '../assets/courseVideos';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([courses.find(course => course._id === "Python")]);

  const [continueWatching, setContinueWatching] = useState([]);
  



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

  const purchaseCourses = (courseList) => {
    const enrichedCourses = courseList.map(course =>
      courses.find(c => c._id === course._id) || course
    );
  
    setPurchasedCourses(prev => {
      const newCourses = enrichedCourses.filter(
        newCourse => !prev.find(p => p._id === newCourse._id)
      );
      return [...prev, ...newCourses];
    });
  
    clearCart();
  };

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

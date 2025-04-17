
// CartContext.jsx

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (course) => {
    setCartItems(prev => {
      if (prev.find(item => item.name === course.name)) return prev;
      return [...prev, course];
    });
  };

  const removeFromCart = (courseName) => {
    setCartItems(prev => prev.filter(item => item.name !== courseName));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

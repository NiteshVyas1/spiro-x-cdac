import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || ""); // Default fallback if nothing is in localStorage

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedUserId = localStorage.getItem("userId");

    // If we have values stored in localStorage, use them
    if (storedToken && storedName && storedEmail && storedUserId) {
      setToken(storedToken);
      setUserName(storedName);
      setUserEmail(storedEmail);
      setUserId(storedUserId);
    }
  }, []);

  const userInitial = userName?.charAt(0).toUpperCase() || ""; // Get the first letter of the username

  const value = {
    userName,
    userEmail,
    token,
    setToken,
    setUserName,  // to allow updating the name
    setUserEmail,  // to allow updating the email
    setUserId,
    userId, 
    userInitial,   // Expose the initial letter of the username
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;

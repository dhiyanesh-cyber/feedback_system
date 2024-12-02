import React, { createContext, useState, useEffect } from "react";

// Create User Context
export const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user details

  // Load user data from localStorage (if available) on app load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to update user and sync with localStorage
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("userDetails", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

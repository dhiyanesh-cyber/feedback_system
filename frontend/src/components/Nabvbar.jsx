import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored user details
    navigate("/auth"); // Redirect to the login page
  };

  return (
    <nav className="bg-white p-4 flex items-center justify-between">
      <div className="flex items-center">
      <img src="/logo.png" alt="SSMIET Logo" className="h-14 ml-20" />

        {/* <span className="text-black text-4xl font-normal ">SSM Institute of Engineering and Technology</span> */}
      </div>
      <button
        onClick={handleLogout}
        className="text-white bg-customGray px-4 py-2 rounded hover:bg-slate-400 mr-20"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

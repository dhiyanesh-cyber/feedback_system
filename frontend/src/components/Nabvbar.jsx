import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored user details
    navigate("/auth"); // Redirect to the login page
  };

  return (
    <nav className="bg-white p-4 flex flex-wrap items-center justify-between border-b border-gray-300 shadow-sm">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center">
        <img src="/ssmlogo.png" alt="SSMIET Logo" className="h-10 sm:h-14 ml-4 sm:ml-10" />
        <span className="hidden sm:block text-black text-lg sm:text-2xl font-semibold ml-4">
          SSM Institute of Engineering and Technology
        </span>
      </div>

      {/* Right Section: Logout Button */}
      <div className="mt-2 sm:mt-0">
        <button
          onClick={handleLogout}
          className="text-white bg-customGray px-4 py-2 rounded hover:bg-slate-400 ml-auto sm:mr-10"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

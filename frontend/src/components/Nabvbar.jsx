import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  
  

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/auth");
  };

  const handleLogoClick = () => { 
    userDetails.role == 'admin' ? navigate("/admin/departments")  : navigate("/student-panel")
  }

  return (
    <nav className="bg-white p-4 flex flex-wrap items-center justify-between border-b border-gray-300 shadow-sm">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center">
        <img src="/ssmlogo.png" onClick={handleLogoClick} alt="SSMIET Logo" className="h-10 sm:h-14 ml-4 sm:ml-10 cursor-pointer" />
        <div className="ml-6">
            <span className="hidden sm:block text-black text-lg sm:text-2xl font-semibold">
              SSM Institute of Engineering and Technology
            </span>
            <span>An Autonomous Institution</span>
        </div>
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

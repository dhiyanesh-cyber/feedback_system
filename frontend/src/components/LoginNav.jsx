import React from "react";
import { useNavigate } from "react-router-dom";

const LoginNav = () => {
  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/auth");
  };

  return (
    <nav className="bg-white p-4 flex flex-wrap items-center justify-between border-b border-gray-300 shadow-sm">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center">
        <img src="/ssmlogo.png" alt="SSMIET Logo" className="h-10 sm:h-14 ml-4 sm:ml-10" />
        <div className="ml-6">
            <span className="hidden sm:block text-black text-lg sm:text-2xl font-semibold">
              SSM Institute of Engineering and Technology
            </span>
            <span>An Autonomous Institution</span>
        </div>
      </div>

      
    </nav>
  );
};

export default LoginNav;

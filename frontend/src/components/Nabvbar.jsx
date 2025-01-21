import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi"; // Importing a settings icon

const Navbar = (props) => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const handleLogoClick = () => {


    if (userDetails.role === "Principal") {
      navigate("/admin/report");
    } else if (userDetails.role === "Admin") {
      navigate("/admin/departments");
    } else {
      navigate("/student-panel");
    }
  };

  const handleSettingsClick = () => {
    navigate("/admin/settings");
  };
  const handleReportClick = () => {
    navigate("/admin/report");
  };
  const handleDashboardClick = () => {
    navigate("/admin/departments");
  };

  return (
    <nav className="bg-white p-2 sm:p-4 flex flex-wrap items-center justify-between border-b border-gray-300 shadow-sm"  >
      {/* Left Section: Logo and Title */}
      <div className="flex items-center">
        <img
          src="/ssmlogo.png"
          onClick={handleLogoClick}
          alt="SSMIET Logo"
          className="h-16 sm:h-14 sm:ml-10 cursor-pointer"
        />
        <div className="ml-6">
          <span className="hidden sm:block text-black text-lg sm:text-2xl font-semibold">
            SSM Institute of Engineering and Technology
          </span>

          <span className="hidden sm:block">An Autonomous Institution</span>
          {props.isLogin &&
            <>
              <span className="block sm:hidden text-black text-2xl sm:text-2xl font-semibold tracking-widest">
                SSMIET
              </span>
              <span className="block text-sm sm:hidden">An Autonomous Institution</span>
            </>
          }
        </div>
      </div>

      {props.isLogin == true ?
        <></> :
        <div className="flex items-center sm:mt-0">
          {userDetails?.role === "Admin" && (
            <>

              <button
                onClick={handleDashboardClick}
                className="text-black hover:text-gray-700 mr-4 sm:mr-6"
              >
                <h1 className="text-black text-xl hover:text-gray-700 mr-4 sm:mr-6">Dashboard</h1>
              </button>
              <button
                onClick={handleReportClick}
                className="text-black hover:text-gray-700 mr-4 sm:mr-6"
              >
                <h1 className="text-black text-xl hover:text-gray-700 mr-4 sm:mr-6">Report</h1>
              </button>
              <button
                onClick={handleSettingsClick}
                className="text-black hover:text-gray-700 mr-4 sm:mr-6"
              >
                <FiSettings size={24} />
              </button>
            </>
          )}
          <button
            onClick={handleLogout}
            className="text-white bg-customGray px-4 py-2 rounded hover:bg-slate-400 ml-auto sm:mr-10"
          >
            Logout
          </button>
        </div>
      }


    </nav>
  );
};

export default Navbar;

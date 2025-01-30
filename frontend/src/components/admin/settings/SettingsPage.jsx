import React, { useState } from "react";
import DepartmentSetting from "./DepartmentSetting";
import Navbar from "../../Nabvbar";
import StudentSetting from "./StudentSetting";
import FacultySetting from "./FacultySetting";
import SemesterComponent from "./SemesterComponent";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "departments":
        return <DepartmentSetting />;
      case "students":
        return <StudentSetting />;
      case "faculties":
        return <FacultySetting />;
      case "semester":
        return <SemesterComponent />;
      default:
        return <div>Select a category from the menu</div>;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Close sidebar on mobile after selecting a tab
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Mobile Menu Button - Moved to top right */}
        <button
          className="md:hidden fixed top-2 right-4 z-20 p-2 rounded-md bg-black text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Sidebar */}
        <nav
          className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 fixed md:relative z-10 w-64 bg-white border-r shadow-lg transition-transform duration-300 ease-in-out h-screen`}
        >
          <ul className="space-y-2 p-4">
            {[
              { id: "departments", label: "Departments" },
              { id: "students", label: "Students" },
              { id: "faculties", label: "Faculties" },
              { id: "semester", label: "Semester" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded transition-colors duration-200 ${activeTab === item.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                    }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 mt-16 md:mt-0 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
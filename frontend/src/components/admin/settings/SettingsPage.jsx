import React, { useState } from "react";
import DepartmentSetting from "./DepartmentSetting";
import Navbar from "../../Nabvbar";
import StudentSetting from "./StudentSetting";
import FacultySetting from "./FacultySetting";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("departments"); // Default tab

  const renderContent = () => {
    switch (activeTab) {
      case "departments":
        return <DepartmentSetting />;
      case "students":
        return <StudentSetting />;
      case "faculties":
        return <FacultySetting />;
      default:
        return <div>Select a category from the left menu</div>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar */}
        <nav className="w-1/4 bg-white border-r shadow-lg">
          <ul className="space-y-2 p-4">
            <li>
              <button
                onClick={() => setActiveTab("departments")}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "departments"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Departments
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("students")}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "students"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Students
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("faculties")}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "faculties"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Faculties
              </button>
            </li>
          </ul>
        </nav>
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">{renderContent()}</div>
      </div>
    </>
  );
};

export default SettingsPage;

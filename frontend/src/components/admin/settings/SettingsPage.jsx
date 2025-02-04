import React, { useState } from "react";
import DepartmentSetting from "./DepartmentSetting";
import Navbar from "../../Nabvbar";
import StudentSetting from "./StudentSetting";
import FacultySetting from "./FacultySetting";
import SemesterComponent from "./SemesterComponent";
import SubjectSetting from "./SubjectSetting";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Menu items array
  const menuItems = [
    {
      id: "departments",
      label: "Departments",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: "students",
      label: "Students",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: "faculties",
      label: "Faculties",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: "subjects",
      label: "Subjects",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: "semester",
      label: "Semester",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "departments":
        return <DepartmentSetting />;
      case "students":
        return <StudentSetting />;
      case "faculties":
        return <FacultySetting />;
      case "subjects":
        return <SubjectSetting />;
      case "semester":
        return <SemesterComponent />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Select a category from the menu
            </p>
          </div>
        );
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Main Container */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] pt-16 md:pt-0">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-20 right-4 z-50 p-2 rounded-md bg-black text-white shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Sidebar */}
        <aside
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            fixed md:relative
            z-40
            w-64
            h-100
            bg-white
            border-r
            shadow-lg
            transition-transform
            duration-300
            ease-in-out
            overflow-y-auto
          `}
        >
          <nav className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800 px-4">Settings</h2>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className={`
                      flex items-center
                      w-full
                      px-4 py-2
                      rounded-lg
                      transition-colors
                      duration-200
                      ${activeTab === item.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
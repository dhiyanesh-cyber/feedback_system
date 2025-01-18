import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Nabvbar';

const ReportIndex = () => {
  const navigate = useNavigate();

  // Handlers for navigation
  const handleDeptClick = () => {
    navigate('/admin/report/departments');
  };

  const handleFacultyClick = () => {
    navigate('/admin/report/faculty');
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start pt-32 min-h-screen bg-gray-50">
        <div className="w-full max-w-lg bg-white rounded-xl border-2 border-gray-300 p-8">
          <h2 className="text-xl font-medium text-center text-black opacity-90 mb-6">
            Select Report
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-2 justify-between">
              <button
                onClick={handleDeptClick}
                className="px-4 py-2 w-full text-white bg-customGray hover:bg-gray-700 rounded-md shadow-md transition duration-200"
              >
                Departments
              </button>
              <button
                onClick={handleFacultyClick}
                className="px-4 py-2 w-full text-white bg-customGray hover:bg-gray-700 rounded-md shadow-md transition duration-200"
              >
                Faculty
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ReportIndex;
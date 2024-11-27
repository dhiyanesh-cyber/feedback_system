import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const YearSelection = () => {
  const navigate = useNavigate();
  const { department_id } = useParams(); // Get department ID from the route

  // Static year options
  const years = [
    { id: 2, name: "2nd Year" },
    { id: 3, name: "3rd Year" },
    { id: 4, name: "4th Year" },
  ];

  const handleYearClick = (yearId) => {
    // Navigate to class list page for the selected year
    navigate(`/admin/departments/${department_id}/years/${yearId}/classes`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl bg-white border-2 border-dashed border-gray-400 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Select Year</h2>
        <ul className="space-y-4">
          {years.map((year) => (
            <li
              key={year.id}
              onClick={() => handleYearClick(year.id)}
              className="p-4 bg-blue-100 border-2 border-dashed border-gray-400 rounded-lg text-gray-700 text-center cursor-pointer hover:bg-blue-200 transition duration-200"
            >
              {year.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YearSelection;

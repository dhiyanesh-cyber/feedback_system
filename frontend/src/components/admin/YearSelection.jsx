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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-black opacity-90 mb-6">
          Select Year
        </h2>
        <ul className="space-y-4">
          {years.map((year) => (
            <li
              key={year.id}
              onClick={() => handleYearClick(year.id)}
              className="p-4 bg-white border-2 border-gray-300 rounded-lg text-white-500 text-center cursor-pointer hover:text-white hover:bg-customGray transition duration-200 ease-in-out transform hover:scale-105 w-60 place-self-center"
            >
              <span className="font-medium text-lg">{year.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YearSelection;
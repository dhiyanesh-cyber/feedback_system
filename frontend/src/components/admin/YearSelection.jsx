import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const YearSelection = () => {
  const { department_id } = useParams();
  const navigate = useNavigate();

  const years = [
    { id: 2, name: "2nd Year" },
    { id: 3, name: "3rd Year" },
    { id: 4, name: "4th Year" },
  ];

  const handleYearClick = (yearId) => {
    navigate(`/admin/departments/${department_id}/years/${yearId}/add`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl bg-white border-2 border-dashed border-gray-400 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Year</h2>
        <div className="flex justify-around">
          {years.map((year) => (
            <button
              key={year.id}
              onClick={() => handleYearClick(year.id)}
              className="px-6 py-4 bg-blue-100 border-2 border-dashed border-gray-400 rounded-lg text-gray-700 hover:bg-blue-200 transition duration-200"
            >
              {year.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearSelection;

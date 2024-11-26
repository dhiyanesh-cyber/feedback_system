import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const YearSelection = () => {
  const navigate = useNavigate();
  const { department_id } = useParams();

  const years = [
    { id: 2, name: "2nd Year" },
    { id: 3, name: "3rd Year" },
    { id: 4, name: "4th Year" },
  ];

  const handleYearClick = (yearId) => {
    navigate(`/admin/departments/${department_id}/years/${yearId}/classes`);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Select Year</h2>
      <ul className="space-y-2">
        {years.map((year) => (
          <li
            key={year.id}
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleYearClick(year.id)}
          >
            {year.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YearSelection;

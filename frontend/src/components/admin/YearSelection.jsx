import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Nabvbar";

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
    navigate(`/admin/departments/${department_id}/${yearId}/`);
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-start pt-32 min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg border-2 border-gray-300x p-8">
        <h2 className="text-xl font-normal text-center text-black opacity-90 mb-6">
          Select Year
        </h2>
        <ul className="space-y-4">
          {years.map((year) => (
            <li
              key={year.id}
              onClick={() => handleYearClick(year.id)}
              className="p-4 bg-white border-2 border-gray-300x rounded-lg text-white-500 text-center cursor-pointer hover:text-white hover:bg-customGray transition duration-200 ease-in-out transform  w-60 place-self-center"
            >
              <span className="text-lg font-normal">{year.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default YearSelection;
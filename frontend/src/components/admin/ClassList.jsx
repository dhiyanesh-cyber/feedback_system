import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Nabvbar";

const ClassList = () => {
  const { department_id, year_id } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(
    localStorage.getItem("selectedSemester") || 1
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        console.log(department_id);

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/class/${department_id}/${year_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch classes.");
        }
        const data = await response.json();

        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [department_id, year_id]);

  const handleSemesterChange = (e) => {
    const semester = Number(e.target.value);
    setSelectedSemester(semester);
    localStorage.setItem("selectedSemester", semester);
  };

  const handleClassClick = (classId) => {
    console.log("Class list:", classId, "Semester:", selectedSemester);
    navigate(
      `/admin/departments/${department_id}/${year_id}/${classId}`
    );
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading classes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start pt-32 min-h-screen bg-gray-50">
        <div className="w-full max-w-lg bg-white rounded-xl border-2 border-gray-300 p-8 flex flex-col items-center justify-center">
          <h2 className="text-xl font-normal text-center text-black opacity-90 mb-6">
            Select Class
          </h2>

          {/* Semester Selection Styled as List Item */}
          <div className="mb-6 text-center w-full">
            <label
              htmlFor="semester"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Semester
            </label>
            <div className="relative">
              <select
                id="semester"
                value={selectedSemester}
                onChange={handleSemesterChange}
                className="w-full  p-4 bg-white border-2 border-gray-300 rounded-lg text-center cursor-pointer transition duration-200 ease-in-out"
              >
                {[...Array(8)].map((_, index) => (
                  <option
                    key={index + 1}
                    value={index + 1}
                    className="p-4 text-gray-500 cursor-pointer"
                  >
                    Semester {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ul className="space-y-4">
            {classes.map((classItem) => (
              <li
                key={classItem.class_id}
                onClick={() => handleClassClick(classItem.class)}
                className="p-4 bg-white border-2 border-gray-300 rounded-lg text-center cursor-pointer hover:text-white hover:bg-customGray transition duration-200 ease-in-out transform w-60 place-self-center"
              >
                {classItem.class}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ClassList;

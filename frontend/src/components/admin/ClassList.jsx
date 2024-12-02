import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ClassList = () => {
  const { department_id, year_id } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        console.log(department_id);
        
        const response = await fetch(
          `http://localhost:3000/api/class/${department_id}/${year_id}`
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

  const handleClassClick = (classId) => {
    navigate(`/admin/departments/${department_id}/years/${year_id}/classes/${classId}/add`);
  };

  if (loading) return <p className="text-center text-gray-600">Loading classes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-black opacity-90 mb-6">Select Class</h2>
        <ul className="space-y-4">
          {classes.map((classItem) => (
            <li
              key={classItem.class_id}
              onClick={() => handleClassClick(classItem.class_id)}
              className="p-4 bg-white border-2 border-gray-300 rounded-lg text-white-500 text-center cursor-pointer hover:text-white hover:bg-customGray transition duration-200 ease-in-out transform hover:scale-105 w-60 place-self-center"
            >
              {classItem.class}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassList;
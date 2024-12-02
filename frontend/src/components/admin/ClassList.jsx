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

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl bg-white border-2 border-dashed border-gray-400 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Select Class</h2>
        <ul className="space-y-2">
          {classes.map((classItem) => (
            <li
              key={classItem.class_id}
              onClick={() => handleClassClick(classItem.class_id)}
              className="p-4 bg-blue-100 border-2 border-dashed border-gray-400 rounded-lg text-gray-700 hover:bg-blue-200 cursor-pointer"
            >
              {classItem.class_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassList;

import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useEndpoint } from "../../context/EndpointContext";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCurrentEndpoint } = useEndpoint();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (err) {
        setError("Failed to load departments.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDepartmentClick = (departmentId) => {
    setCurrentEndpoint(`/departments/${departmentId}`);
    navigate(`/admin/departments/${departmentId}/years`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-50">
        <p className="text-center text-lg text-gray-600">Loading departments...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-50">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
          Select a Department
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {departments.map((department) => (
            <button
              key={department.department_code}
              className="w-full py-4 px-6 font-medium text-black bg-white rounded-lg shadow-md hover:bg-customGray hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-300 transform transition-all hover:scale-105 duration-200"
              onClick={() => handleDepartmentClick(department.department_code)}
            >
              {department.department_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;

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
    <div className="flex items-center justify-center min-h-screen bg-grey-dark shadow-10">
      <div className="w-full max-w-2xl p-10 bg-grey-light rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          Select a Department
        </h2>
        <div className="space-y-4">
          {departments.map((department) => (
            <button
              key={department.department_code}
              className="w-full py-3 px-4 font-medium text-gray-600 bg-gray-200  rounded-md border border-gray-200 shadow-lg text-center  hover:bg-blue-200  focus:border-black focus:ring-opacity-50"
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

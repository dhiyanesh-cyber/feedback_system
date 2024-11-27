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

  if (loading) return <p className="text-center mt-6 text-lg">Loading departments...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 mt-10 mb-10">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Departments</h2>
        <ul className="space-y-4">
          {departments.map((department) => (
            <li
              key={department.department_code}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100 text-center"
              onClick={() => handleDepartmentClick(department.department_code)}
            >
              {department.department_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentList;

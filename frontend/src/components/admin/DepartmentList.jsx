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

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Departments</h2>
      <ul className="space-y-2">
        {departments.map((department) => (
          <li
            key={department.department_code}
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleDepartmentClick(department.department_code)}
          >
            {department.department_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;

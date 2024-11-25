import React, { useEffect, useState } from 'react';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]); // State to store department data
  const [error, setError] = useState(null); // State to store errors if any
  const [loading, setLoading] = useState(true); // State to indicate loading status

  useEffect(() => {
    // Fetch data from the backend
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3000/departments/');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json(); // Parse the JSON data
        setDepartments(data); // Update state with the data
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array ensures this runs once after component mounts

  // Handle loading state
  if (loading) {
    return <div>Loading departments...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Department List</h1>
      <ul>
        {departments.map((department) => (
          <li key={department.department_code}>
            {department.department_name} ({department.department_code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;

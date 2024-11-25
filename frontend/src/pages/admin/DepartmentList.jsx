import React, { useContext, useState, useEffect } from "react";
import { DepartmentContext } from "../../context/DepartmentContext"; // Correct path for context
import { years } from "../../data/constants";
import DepartmentButton from "../../components/admin/Departmentbutton";
import YearButton from "../../components/admin/YearButton";
import Form from "../../components/admin/Form";

const DepartmentList = () => {
  const { selectedDepartment, setSelectedDepartment, selectedYear, setSelectedYear } =
    useContext(DepartmentContext); // Accessing context
  const [staffId, setStaffId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:3000/departments");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentClick = (department) => {
    console.log(department);
    
    setSelectedDepartment(department);
    setSelectedYear(null); // Reset year selection
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Staff ID: ${staffId}, Subject ID: ${subjectId}`);
    setStaffId("");
    setSubjectId("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Department List</h1>
      {!selectedDepartment ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {departments.map((department) => (
            <DepartmentButton
              key={department.department_code}
              department={department}
              onClick={handleDepartmentClick}
            />
          ))}
        </div>
      ) : !selectedYear ? (
        <div className="grid grid-cols-3 gap-4">
          {years.map((year) => (
            <YearButton key={year} year={year} onClick={handleYearClick} />
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <button
            className="mb-4 p-2 bg-gray-300 rounded-md"
            onClick={() => setSelectedYear(null)}
          >
            &larr; Back
          </button>
          <Form
            staffId={staffId}
            setStaffId={setStaffId}
            subjectId={subjectId}
            setSubjectId={setSubjectId}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default DepartmentList;

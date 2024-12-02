import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and is a student
    const userRole = localStorage.getItem("userRole");
    const registrationNumber = localStorage.getItem("registrationNumber");

    console.log("Student details :", userRole   );
    

    if (userRole !== "student" || !registrationNumber) {
      // Redirect to login page if not logged in as a student
      navigate("/auth");
    }
  }, [navigate]);

  const handleDivClick = () => {
    console.log("Data in localStorage:", {
      userRole: localStorage.getItem("userRole"),
      registrationNumber: localStorage.getItem("registrationNumber"),
    });
  };

  // Retrieve student's registratio n number
  const registrationNumber = localStorage.getItem("registrationNumber");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md" onClick={handleDivClick}>
        <h1 className="text-2xl font-bold mb-4">Welcome to the Student Panel</h1>
        <p className="text-lg">Hello, Student with Registration Number: <strong>{registrationNumber}</strong></p>
      </div>
    </div>
  );
};

export default StudentPanel;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentPanel = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    // Check if the user is logged in and is a student

    if (userDetails.role !== "student" || !userDetails.registrationNumber) {
      // Redirect to login page if not logged in as a student
      console.log("From std panel : ", userDetails.registrationNumber);
      console.log("From std panel : ", userDetails.role === "student");
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Student Panel
        </h1>
        <p className="text-lg">
          Hello, Student with Registration Number:{" "}
          <strong>{userDetails.registrationNumber}</strong>
        </p>
      </div>
    </div>
  );
};

export default StudentPanel;

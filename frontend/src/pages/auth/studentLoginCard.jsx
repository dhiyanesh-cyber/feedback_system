import React, { useState } from "react";
import { Card, CardHeader, Divider } from "@nextui-org/react";
import { validateStudentLogin } from "../../services/auth/studentAuthentication";
import { useNavigate } from "react-router-dom";

const StudentLoginCard = ({ toggle }) => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message
  const navigate = useNavigate();

  const formatDateToYYYYMMDD = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  const handleStudentLogin = async () => {
    if (!registerNumber || !dateOfBirth) {
      setErrorMessage("Both Register Number and Date of Birth are required.");
      return;
    }

    const formattedDOB = formatDateToYYYYMMDD(dateOfBirth);

    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error message
    try {
      const data = await validateStudentLogin(registerNumber, formattedDOB);

      const studentData = {
        role: "student",
        registrationNumber: registerNumber,
        name: data.student.student_name,
        department: data.student.student_department,
        year: data.student.student_year,
        class: data.student.class,
      };

      localStorage.setItem("userDetails", JSON.stringify(studentData));

      navigate("/student-panel", {
        state: { msg: "Login successful", type: "success" },
      });
    } catch (error) {
      setErrorMessage(error.message || "Invalid Register Number or Date of Birth.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-4 p-3">
      <CardHeader className="flex flex-col gap-3">
        <h2 className="text-xl text-customGray font-medium text-left w-full">
          Student Login
        </h2>
        <Divider />

        <div className="mb-4 w-full">
          <label
            className="block text-customGray text-sm font-normal mb-1"
            htmlFor="studentRegisterNumber"
          >
            Register Number
          </label>
          <input
            type="text"
            name="registerNumber"
            id="studentRegisterNumber"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded outline-1 focus:outline-customGray"
          />
        </div>
        <div className="mb-4 w-full">
          <label
            className="block text-customGray text-sm font-normal mb-1"
            htmlFor="studentDateOfBirth"
          >
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="studentDateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded outline-1 focus:outline-customGray"
          />
        </div>
        {errorMessage && (
          <div className="bg-red-100 text-red-500 p-2 rounded font-light w-full mb-4 border border-red-300">
            {errorMessage}
          </div>
        )}
        <button
          type="button"
          onClick={handleStudentLogin}
          className="w-full bg-customGray text-white p-2 rounded hover:bg-gray-700 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="mt-4 text-sm text-center">
          Not a student?{" "}
          <a
            href="#"
            onClick={toggle}
            className="text-customGray hover:underline"
          >
            Switch to Admin Login
          </a>
        </p>
      </CardHeader>
    </Card>
  );
};

export default StudentLoginCard;

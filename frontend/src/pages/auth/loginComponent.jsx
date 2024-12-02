import React, { useState } from "react";
import { validateDateOfBirth } from "../../utils/auth/DobValidation";
import { validateStudentLogin } from "../../services/auth/studentAuthentication";
import { useNavigate } from "react-router-dom";
import { validateAdminLogin } from "../../services/auth/adminAuthentication";

const LoginComponent = () => {
  const [isStudentLogin, setIsStudentLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    registrationNumber: "",
    dob: "",
    password: "",
    username: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isStudentLogin) {
      const { registrationNumber, dob } = credentials;

      if (!registrationNumber || !dob) {
        return alert("Both Registration Number and Date of Birth are required");
      }

      const { valid, message } = validateDateOfBirth(dob);
      if (!valid) {
        return alert(message);
      } try {
        const data = await validateStudentLogin(registrationNumber, dob);
        alert("Login Successful!");
        
        console.log(data);
        
        const studentDetails = {
          role: "student",
          registrationNumber,
          name: data.student.student_name,
          department: data.student.student_department,
          year: data.student.student_year,
        };
  
        localStorage.setItem("userDetails", JSON.stringify(studentDetails));
        
        navigate("/student-panel")
      } catch (error) {
        alert(error.message);
      }

    } else {
      const { username, password } = credentials;

      if (!username || !password) {
        return alert("Both Username and Password are required");
      }

      try {
        const data = await validateAdminLogin(username, password);
        alert("Admin Login Successful!");
        const adminDetails = {
          role: "admin",
          username
        };
  
        localStorage.setItem("userDetails", JSON.stringify(adminDetails));
        navigate("/admin/departments");
      } catch (error) {
        alert(error.message);
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">
          {isStudentLogin ? "Student Login" : "Admin Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isStudentLogin ? (
            <>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="registrationNumber"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  id="registrationNumber"
                  value={credentials.registrationNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Date Of Birth
                </label>
                <div className="relative">
                  <input
                    name="dob"
                    id="dob"
                    value={credentials.dob}
                    onChange={handleChange}
                    placeholder="yyyy-mm-dd"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-customGray text-white p-2 rounded hover:bg-gray-700 transition duration-200" // Use custom color here
              >
                Login
              </button>
              <p className="mt-4 text-sm text-center">
                <button
                  type="button"
                  onClick={() => setIsStudentLogin(false)}
                  className="text-customGray hover:underline ml-1" // Use custom color here
                >
                  Click here if you are an Admin
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="passwordAdmin"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-customGray text-white p-2 rounded hover:bg-gray-700 transition duration-200" // Use custom color here
              >
                Login
              </button>
              <p className="mt-4 text-sm text-center">
                <button
                  type="button"
                  onClick={() => setIsStudentLogin(true)}
                  className="text-customGray hover:underline ml-1" // Use custom color here
                >
                  Click here if you are a Student
                </button>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;

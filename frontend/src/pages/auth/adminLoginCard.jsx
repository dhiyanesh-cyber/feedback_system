import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, Divider } from "@nextui-org/react";
import { sendAdminOtp, validateAdminOtp, } from "../../services/auth/adminAuthentication";
import { useNavigate } from "react-router-dom";

const AdminLoginCard = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    if (!email) {
      setErrorMessage("Please enter an email address.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    try {
      await sendAdminOtp(email);
      setIsOtpSent(true);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const navigateUser = async (adminDetails) => {
    console.log(adminDetails);

    if (adminDetails.admin.role === "Admin") {
      navigate("/admin/departments");
    }
    if (adminDetails.admin.role === "Principal") {
      navigate("/admin/report");
    }
  }


  const handleOtpVerification = async () => {
    if (!otp) {
      setErrorMessage("Please enter the OTP.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    try {
      const adminDetails = await validateAdminOtp(email, otp);
      localStorage.setItem("userDetails", JSON.stringify(adminDetails.admin));
      alert("Login successful!");
      navigateUser(adminDetails);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setIsLoading(false); 7
    }
  };

  return (
    <Card className="w-full max-w-sm mx-4 p-3">
      <CardHeader className="flex flex-col gap-3">
        <h2 className="text-xl text-customGray font-medium text-left w-full">
          Admin Login
        </h2>
        <Divider />
        {errorMessage && (
          <div className="w-full bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        {!isOtpSent ? (
          <>
            <div className="mb-4 w-full">
              <label
                className="block text-customGray text-sm font-normal mb-1"
                htmlFor="adminEmail"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="adminEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded outline-1 focus:outline-customGray"
              />
            </div>
            <button
              type="button"
              onClick={handleAdminLogin}
              className="w-full bg-customGray text-white p-2 rounded hover:bg-gray-700 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <div className="mb-4 w-full">
              <label
                className="block text-customGray text-sm font-normal mb-1"
                htmlFor="otp"
              >
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded outline-1 focus:outline-customGray"
              />
            </div>
            <button
              type="button"
              onClick={handleOtpVerification}
              className="w-full bg-customGray text-white p-2 rounded hover:bg-gray-700 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </>
        )}
        <p className="mt-4 text-sm text-center">
          Not an admin?{" "}
          <a
            href="#"
            onClick={toggle}
            className="text-customGray hover:underline"
          >
            Switch to Student Login
          </a>
        </p>
      </CardHeader>
    </Card>
  );
};

export default AdminLoginCard;

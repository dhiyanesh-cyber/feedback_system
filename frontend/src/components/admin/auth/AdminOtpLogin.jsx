import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Card, CardHeader, Divider } from "@nextui-org/react";
import { sendAdminOtp, validateAdminOtp } from "../../../services/auth/adminAuthentication";

const AdminOtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      alert("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      await sendAdminOtp(email);
      setOtpSent(true);
      alert("OTP sent successfully! Check your email.");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    try {
      const adminDetails = await validateAdminOtp(email, otp);

      const adminData = {
        role: "admin",
        email: adminDetails.email,
      };

      localStorage.setItem("userDetails", JSON.stringify(adminData));
      alert("Admin login successful!");
      // Navigate to admin dashboard
      window.location.href = "/admin/departments";
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar isLogin={true} />
      <div className="h-[calc(100svh-10rem)] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-start pt-32 justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <Card className="w-full max-w-sm mx-4 p-3">
          <CardHeader className="flex flex-col gap-3">
            <h2 className="text-xl text-customGray font-medium text-left w-full">
              Admin Login
            </h2>

            {!otpSent ? (
              <>
                <div className="mb-4">
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
                  onClick={handleSendOtp}
                  className="w-full bg-customGray text-white p-2 rounded hover:bg-gray-700 transition duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    className="block text-customGray text-sm font-normal mb-1"
                    htmlFor="adminOtp"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    id="adminOtp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded outline-1 focus:outline-customGray"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleValidateOtp}
                  className="w-full bg-customGray text-white p-2 rounded hover:bg-gray-700 transition duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Validating..." : "Validate OTP"}
                </button>
              </>
            )}
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default AdminOtpLogin;

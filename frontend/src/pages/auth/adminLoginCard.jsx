import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, Divider } from "@nextui-org/react";

const AdminLoginCard = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/send-otp`,
        { email }
      );

      alert("OTP sent successfully to your email.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-4 p-3">
      <CardHeader className="flex flex-col gap-3">
        <h2 className="text-xl text-customGray font-medium text-left w-full">
          Admin Login
        </h2>
        <Divider />
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

import React, { useState } from "react";
import Navbar from "../../components/Nabvbar";
import AdminLoginCard from "./adminLoginCard";
import StudentLoginCard from "./studentLoginCard";

const LoginComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Default to student login

  return (
    <>
      <Navbar isLogin={true} />
      <div className="h-[calc(100svh-10rem)] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-start pt-32 justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {isAdmin ? (
          <AdminLoginCard toggle={() => setIsAdmin(false)} /> // Switch to student login
        ) : (
          <StudentLoginCard toggle={() => setIsAdmin(true)} /> // Switch to admin login
        )}
      </div>
    </>
  );
};

export default LoginComponent;

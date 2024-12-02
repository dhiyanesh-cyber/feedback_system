import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { EndpointProvider } from "./context/EndpointContext";

import LoginComponent from "./pages/auth/loginComponent";
import StudentPanel from "./pages/student/StudentPanel";
import DepartmentList from "./components/admin/DepartmentList";
import YearSelection from "./components/admin/YearSelection";
import ClassList from "./components/admin/ClassList";
import AddDetails from "./components/admin/AddDetails";
import PublishPage from "./components/admin/Publishpage";

import "./index.css";

// Protected route for authentication and role-based access
const ProtectedRoute = ({ children, role }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log("from app : ", userDetails);
  

  if (!userDetails) {
    return <Navigate to="/auth" replace />;
  }

  if (role && userDetails.role !== role) {
    console.log("Admin logged");
    
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <UserProvider>
      <EndpointProvider>
        <Router>
          <Routes>
            {/* Redirect / to /auth */}
            <Route path="/" element={<Navigate to="/auth" replace />} />

            {/* Authentication route */}
            <Route path="/auth" element={<LoginComponent />} />

            {/* Student routing */}
            <Route
              path="/student-panel"
              element={
                <ProtectedRoute role="student">
                  <StudentPanel />
                </ProtectedRoute>
              }
            />

            {/* Admin routing */}
            <Route
              path="/admin/departments"
              element={
                <ProtectedRoute role="admin">
                  <DepartmentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments/:department_id/years"
              element={
                <ProtectedRoute role="admin">
                  <YearSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments/:department_id/years/:year_id/classes"
              element={
                <ProtectedRoute role="admin">
                  <ClassList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments/:department_id/years/:year_id/add"
              element={
                <ProtectedRoute role="admin">
                  <AddDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments/:department_id/publish"
              element={
                <ProtectedRoute role="admin">
                  <PublishPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </EndpointProvider>
    </UserProvider>
  );
};

export default App;

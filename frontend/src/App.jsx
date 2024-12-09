import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { EndpointProvider } from "./context/EndpointContext";

import LoginComponent from "./pages/auth/loginComponent";
import StudentPanel from "./pages/student/StudentPanel";
// import DepartmentList from "./components/admin/DepartmentList";
import YearSelection from "./components/admin/YearSelection";
import ClassList from "./components/admin/ClassList";
import AddDetails from "./components/admin/AddDetails";
import PublishPage from "./components/admin/PublishPage";
import Questionnaire from "./components/Questionnaire";

import "./index.css";
import DepartmentList from "./components/admin/DepartmentList";
import AdminFormsPage from "./components/admin/AdminFormsPage";

// Protected route for authentication and role-based access
const ProtectedRoute = ({ children, role }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  if (!userDetails) {
    return <Navigate to="/auth" replace />;
  }

  if (role && userDetails.role !== role) {
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
            <Route
              path="/student-panel/:student_id/form/:form_id"
              element={
                <ProtectedRoute role="student">
                  <Questionnaire />
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
              path="/admin/departments/:department_id/years/:year_id/classes/:class_id/addForms"
              element={
                <ProtectedRoute role="admin">
                  <AdminFormsPage />
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

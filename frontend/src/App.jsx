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
import YearSelection from "./components/admin/YearSelection";
import ClassList from "./components/admin/ClassList";
import AddDetails from "./components/admin/AddDetails";
import PublishPage from "./components/admin/PublishPage";
import Questionnaire from "./components/Questionnaire";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import DepartmentList from "./components/admin/DepartmentList";
import AdminFormsPage from "./components/admin/AdminFormsPage";
import ReportPage from "./pages/admin/ReportPage";
import ReportPageFaculty from "./pages/admin/ReportPageFaculty";
import SettingsPage from "./components/admin/settings/SettingsPage";
import ReportPageDepartments from "./pages/admin/ReportPageDepartments";
import ReportIndex from "./pages/admin/ReportIndex";

// Enhanced ProtectedRoute for role-based access
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log("From local storage : ", userDetails.role.toLowerCase());


  if (!userDetails) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(userDetails.role.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <NextUIProvider>
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
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-panel/:student_id/form/:form_id"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <Questionnaire />
                  </ProtectedRoute>
                }
              />

              {/* Admin and Principal routing */}
              <Route
                path="/admin/departments"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <DepartmentList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/report"
                element={
                  <ProtectedRoute allowedRoles={["admin", "principal"]}>
                    <ReportIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/report/faculty"
                element={
                  <ProtectedRoute allowedRoles={["admin", "principal"]}>
                    <ReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/report/departments"
                element={
                  <ProtectedRoute allowedRoles={["admin", "principal"]}>
                    <ReportPageDepartments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/report/:faculty_id"
                element={
                  <ProtectedRoute allowedRoles={["admin", "principal"]}>
                    <ReportPageFaculty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments/:department_id"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <YearSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments/:department_id/:year_id"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <ClassList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments/:department_id/:year_id/:class_id"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminFormsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments/:department_id/publish"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <PublishPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </EndpointProvider>
      </UserProvider>
    </NextUIProvider>
  );
};

export default App;

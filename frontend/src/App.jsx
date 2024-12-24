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
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import DepartmentList from "./components/admin/DepartmentList";
import AdminFormsPage from "./components/admin/AdminFormsPage";
import ReportPage from "./pages/admin/ReportPage";
import ReportPageFaculty from "./pages/admin/ReportPageFaculty";
import ReportPageDepartments from "./pages/admin/ReportPageDepartments";
import ReportIndex from "./pages/admin/ReportIndex";

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
                path="/admin/report/"
                element={
                  <ProtectedRoute role="admin">
                    <ReportIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/report/faculty"
                element={
                  <ProtectedRoute role="admin">
                    <ReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/report/departments"
                element={
                  <ProtectedRoute role="admin">
                    <ReportPageDepartments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/report/:faculty_id"
                element={
                  <ProtectedRoute role="admin">
                    <ReportPageFaculty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments/:department_id/"
                element={
                  <ProtectedRoute role="admin">
                    <YearSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments/:department_id/:year_id/"
                element={
                  <ProtectedRoute role="admin">
                    <ClassList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments/:department_id/:year_id/:class_id/"
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
    </NextUIProvider>
  );
};

export default App;

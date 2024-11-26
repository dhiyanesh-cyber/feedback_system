import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DepartmentList from "./components/admin/DepartmentList";
import YearSelection from "./components/admin/YearSelection";
import ClassList from "./components/admin/ClassList";
import { EndpointProvider } from "./context/EndpointContext";
import "./index.css";
import LoginComponent from "./pages/auth/loginComponent";

const App = () => {
  return (
    <EndpointProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<LoginComponent />} />
          {/* Route for listing departments */}
          <Route path="/admin/departments" element={<DepartmentList />} />
          {/* Route for selecting a year */}
          <Route path="/admin/departments/:department_id/years" element={<YearSelection />} />
          {/* Route for selecting a class */}
          <Route path="/admin/departments/:department_id/years/:yearId/classes" element={<ClassList />} />
        </Routes>
      </Router>
    </EndpointProvider>
  );
};

export default App;

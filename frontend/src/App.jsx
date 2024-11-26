import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DepartmentList from "./components/admin/DepartmentList";
import YearSelection from "./components/admin/YearSelection";
import ClassList from "./components/admin/AddDetails";
import { EndpointProvider } from "./context/EndpointContext";
import  LoginComponent  from "./pages/auth/loginComponent";
import "./index.css";
import AddDetails from "./components/admin/AddDetails";
import PublishPage from "./components/admin/Publishpage";

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
          <Route path="/admin/departments/:department_id/years/:year_id/add" element={<AddDetails />} />
          <Route path="/admin/departments/:department_id/publish" element={<PublishPage />} />
        </Routes>
      </Router>
    </EndpointProvider>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./pages/auth/loginComponent"; // Adjust the path as necessary
import DepartmentList from "./pages/admin/DepartmentList"; // Adjust the path as necessary
import { DepartmentProvider } from "./context/DepartmentContext"; // Import the provider
import "./index.css";

function App() {
  return (
    <DepartmentProvider> {/* Wrap the component tree in the context provider */}
      <Router>
        <Routes>
          {/* Route for the login page */}
          <Route path="/auth" element={<LoginComponent />} />
          
          {/* Route for department selection page */}
          <Route path="/admin/departments" element={<DepartmentList />} />
        </Routes>
      </Router>
    </DepartmentProvider>
  );
}

export default App;

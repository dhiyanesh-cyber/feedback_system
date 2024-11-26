import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./pages/auth/loginComponent"; // Adjust the path as necessary
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for /auth */}
        <Route path="/auth" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

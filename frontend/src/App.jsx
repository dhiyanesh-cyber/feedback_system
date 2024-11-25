import { useState } from "react";
import "./index.css";
import LoginComponent from "./components/login/loginComponent"; // Adjust the path as necessary
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LoginComponent />
      <h1 className="font-sans text-red-600">Hello</h1>
    </>
  );
}

export default App;

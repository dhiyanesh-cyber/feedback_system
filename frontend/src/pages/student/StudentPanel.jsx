import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchForms } from "../../services/formApi";
import Navbar from "../../components/Nabvbar";

const StudentPanel = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log(userDetails);
    
    // Check if the user is logged in and is a student
    if (!userDetails || userDetails.role !== "student" || !userDetails.registrationNumber) {
      console.log("From std panel: Invalid user details", userDetails);
      navigate("/auth");
      return;
    }

    // Fetch forms for the student
    const fetchFormsData = async () => {
      try {
        const data = await fetchForms(
          userDetails.department,
          userDetails.year,
          userDetails.class
        );
        console.log(data);
        
        setForms(data);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormsData();
  }, [navigate]);


  const handleFormClick = async () => {
    try {
      navigate("/questionnaire");
    } catch (error) {
      console.log("Error while navigating : ", error);
      
    }
  }


  if (loading) return <p className="text-center text-gray-600">Loading forms...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Student Panel
        </h1>
        <p className="text-lg mb-6">
          Hello,
          <strong> {JSON.parse(localStorage.getItem("userDetails")).name} </strong>
           with Registration Number:{" "}
          <strong>{JSON.parse(localStorage.getItem("userDetails")).registrationNumber}</strong>
        </p>

        <h2 className="text-xl font-semibold mb-4">Your Forms:</h2>
        <ul className="space-y-4">
          {forms.length > 0 ? (
            forms.map((form) => (
              <li
                key={form.form_id}
                className="p-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-black text-center w-full cursor-pointer"
                onClick={handleFormClick}
              >
                <p>
                  <strong>Subject Code:</strong> {form.subject_id}
                </p>
                <p>
                  <strong>Faculty ID:</strong> {form.faculty_id}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No forms available.</p>
          )}
        </ul>
      </div>
    </div>
    </>
  );
};

export default StudentPanel;
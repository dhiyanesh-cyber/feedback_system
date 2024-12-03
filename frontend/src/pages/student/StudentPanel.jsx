import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formResponsePopulate } from "../../utils/FormResponsePopulate";
import FormCard from "../../components/student/FormCard";

const StudentPanel = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    // Check if the user is logged in and is a student
    if (!userDetails || userDetails.role !== "student" || !userDetails.registrationNumber) {
      console.log("From std panel: Invalid user details", userDetails);
      navigate("/auth");
      return;
    }

    // Fetch forms for the student
    const fetchFormsData = async () => {
      try {
        const data = await formResponsePopulate(userDetails);
        setForms(data);
        console.log(data);
        
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormsData();
  }, [navigate]);

  if (loading) return <p className="text-center text-gray-600">Loading forms...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Separate forms into "not-filled" and "filled" categories
  const notFilledForms = forms.filter((form) => form.status === "not-filled");
  const filledForms = forms.filter((form) => form.status === "filled");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome to the Student Panel
        </h1>
        <p className="text-lg mb-6 text-center">
          Hello,
          <strong> {JSON.parse(localStorage.getItem("userDetails")).name} </strong>
          with Registration Number:{" "}
          <strong>{JSON.parse(localStorage.getItem("userDetails")).registrationNumber}</strong>
        </p>

        {/* Not-Filled Forms Section */}
        <h2 className="text-xl font-semibold mb-4 text-left">Not-Filled Forms:</h2>
        {notFilledForms.length > 0 ? (
          <ul className="space-y-4">
            {notFilledForms.map((form) => (
              <FormCard key={form.form_id} form={form} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">All forms are filled.</p>
        )}

        {/* Filled Forms Section */}
        {filledForms.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-left">Filled Forms:</h2>
            <ul className="space-y-4">
              {filledForms.map((form) => (
                <FormCard key={form.form_id} form={form} />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentPanel;

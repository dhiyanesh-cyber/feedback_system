import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Nabvbar";

const AddDetails = () => {
  const { department_id, year_id, class_id } = useParams();
  const [formData, setFormData] = useState({ staff_id: "", subject_id: "" });
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    if (formData.staff_id && formData.subject_id) {
      setEntries((prev) => [
        ...prev,
        { year: year_id, class: class_id, ...formData },
      ]);
      setFormData({ staff_id: "", subject_id: "" });
    } else {
      alert("Please fill in both fields.");
    }
  };

  const handleNext = () => {
    navigate(
      `/admin/departments/${department_id}/publish, { state: { entries } }`
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-center text-black opacity-90 mb-6">
            Add Details for Class: {class_id}
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="font-medium text-lg text-gray-900 mb-2">
                Staff ID
              </label>
              <input
                type="text"
                name="staff_id"
                value={formData.staff_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-lg text-gray-900 mb-2">
                Subject ID
              </label>
              <input
                type="text"
                name="subject_id"
                value={formData.subject_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              />
            </div>
            <button
              onClick={handleCreate}
              className="mt-6 w-full px-4 py-3 bg-customGray text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Add
            </button>
          </div>
          <button
            onClick={handleNext}
            className="mt-6 w-full px-4 py-3 bg-customGray text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Next: Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default AddDetails;

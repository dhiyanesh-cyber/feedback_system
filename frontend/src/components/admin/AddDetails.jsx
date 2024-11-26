import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddDetails = () => {
  const { department_id, year_id } = useParams();
  const [formData, setFormData] = useState({ staff_id: "", subject_id: "" });
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    if (formData.staff_id && formData.subject_id) {
      setEntries((prev) => [...prev, { year: year_id, ...formData }]);
      setFormData({ staff_id: "", subject_id: "" });
    } else {
      alert("Please fill in both fields.");
    }
  };

  const handleNext = () => {
    navigate(`/admin/departments/${department_id}/publish`, { state: { entries } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl bg-white border-2 border-dashed border-gray-400 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add Details for Year: {year_id}
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium mb-2">Staff ID</label>
            <input
              type="text"
              name="staff_id"
              value={formData.staff_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-400 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-2">Subject ID</label>
            <input
              type="text"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-400 rounded-lg"
            />
          </div>
          <button
            onClick={handleCreate}
            className="w-full px-4 py-2 bg-green-200 border-2 border-dashed border-gray-400 rounded-lg text-gray-700 hover:bg-green-300 transition duration-200"
          >
            Add
          </button>
        </div>
        <button
          onClick={handleNext}
          className="mt-6 w-full px-4 py-2 bg-blue-200 border-2 border-dashed border-gray-400 rounded-lg text-gray-700 hover:bg-blue-300 transition duration-200"
        >
          Next: Publish
        </button>
      </div>
    </div>
  );
};

export default AddDetails;

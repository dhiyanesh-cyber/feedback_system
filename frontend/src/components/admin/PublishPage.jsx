import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PublishPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { entries } = location.state || { entries: [] };

  const handlePublish = () => {
    console.log("Published Data:", entries);
    alert("Data Published Successfully!");
    navigate("/admin"); // Redirect to the admin dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl bg-white border-2 border-dashed border-gray-400 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Publish Entries</h2>
        {entries.length > 0 ? (
          <ul className="space-y-4">
            {entries.map((entry, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg"
              >
                Year: {entry.year}, Staff ID: {entry.staff_id}, Subject ID: {entry.subject_id}
              </li>
            ))}
          </ul>
        ) : (
          <p>No entries to publish.</p>
        )}
        <button
          onClick={handlePublish}
          className="mt-6 w-full px-4 py-2 bg-green-200 border-2 border-dashed border-gray-400 rounded-lg text-gray-700 hover:bg-green-300 transition duration-200"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default PublishPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Nabvbar";

const PublishPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { entries } = location.state || { entries: [] };

  const handlePublish = () => {
    console.log("Published Data:", entries);
    alert("Data Published Successfully!");
    navigate("/admin"); 
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-black opacity-90 mb-6">Publish Entries</h2>
        {entries.length > 0 ? (
          <ul className="space-y-4">
            {entries.map((entry, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 border-2 border-gray-400 rounded-lg"
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
          className="mt-6 w-full px-4 py-3 bg-customGray text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Publish
        </button>
      </div>
    </div>
    </>
  );
};

export default PublishPage;
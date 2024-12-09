import React from "react";

const CustomModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">Alert</h2>
        <p className="text-gray-700 text-center">{message}</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose} // Close modal when clicked
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

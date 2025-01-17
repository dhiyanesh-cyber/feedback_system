import React, { useState, useEffect } from "react";

const FacultySetting = () => {
  const [faculties, setFaculties] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    code: "",
    faculty_name: "",
    dob: "",
    age: "",
    department: "",
    punch_id: "",
  });
  const [action, setAction] = useState("add"); // "add", "update", "delete"
  const [loading, setLoading] = useState(false);

  const endpoint = "/api/facultysettings"; // Replace with your actual API endpoint

  useEffect(() => {
    fetchFaculties();
  }, []);

  // Fetch all faculties
  const fetchFaculties = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setFaculties(data);
    } catch (error) {
      console.error("Failed to fetch faculties:", error);
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (action !== "delete" && !formData.code) {
      alert("Faculty code is required!");
      return;
    }

    try {
      let response;
      if (action === "add") {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else if (action === "update") {
        response = await fetch(`${endpoint}/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else if (action === "delete") {
        response = await fetch(`${endpoint}/${formData.id}`, {
          method: "DELETE",
        });
      }

      if (response.ok) {
        fetchFaculties();
        setFormData({
          id: null,
          code: "",
          faculty_name: "",
          dob: "",
          age: "",
          department: "",
          punch_id: "",
        });
        alert("Action completed successfully!");
      } else {
        console.error("Failed to perform the action");
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Faculty Settings</h1>

      {/* Action Selector */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Select Action</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setAction("add")}
            className={`px-4 py-2 rounded ${
              action === "add" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Add Faculty
          </button>
          <button
            onClick={() => setAction("update")}
            className={`px-4 py-2 rounded ${
              action === "update" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Update Faculty
          </button>
          <button
            onClick={() => setAction("delete")}
            className={`px-4 py-2 rounded ${
              action === "delete" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Delete Faculty
          </button>
        </div>
      </div>

      {/* Form Section */}
      {action && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            {action === "add" && "Add New Faculty"}
            {action === "update" && "Update Existing Faculty"}
            {action === "delete" && "Delete Faculty"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {action !== "add" && (
              <select
                onChange={(e) => {
                  const selected = faculties.find(
                    (faculty) => faculty.id === Number(e.target.value)
                  );
                  setFormData(selected || {});
                }}
                value={formData.id || ""}
                className="border p-2 rounded"
              >
                <option value="" disabled>
                  Select Faculty
                </option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.code} - {faculty.faculty_name}
                  </option>
                ))}
              </select>
            )}
            {action !== "delete" && (
              <>
                <input
                  type="number"
                  placeholder="Faculty Code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Faculty Name"
                  value={formData.faculty_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      faculty_name: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      age: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Punch ID"
                  value={formData.punch_id}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      punch_id: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
              </>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {action === "add" && "Add Faculty"}
            {action === "update" && "Update Faculty"}
            {action === "delete" && "Delete Faculty"}
          </button>
        </div>
      )}

      {/* Existing Faculties */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Faculties</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {faculties.map((faculty) => (
              <li
                key={faculty.id}
                className="flex justify-between py-2 items-center"
              >
                <span>
                  <strong>{faculty.code}</strong>: {faculty.faculty_name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FacultySetting;

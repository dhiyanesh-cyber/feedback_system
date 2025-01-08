import React, { useState, useEffect } from "react";

const DepartmentSetting = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ id: null, code: "", name: "" });
  const [action, setAction] = useState("add"); // Can be "add", "update", or "delete"
  const [loading, setLoading] = useState(false);

  const endpoint = "/api/departmentsetting"; // Replace with actual API endpoint

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!formData.code.trim() || !formData.name.trim()) {
      alert("Both Department Code and Name are required!");
      return;
    }

    try {
      let response;
      if (action === "add") {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: formData.code, name: formData.name }),
        });
      } else if (action === "update") {
        response = await fetch(`${endpoint}/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: formData.code, name: formData.name }),
        });
      } else if (action === "delete") {
        response = await fetch(`${endpoint}/${formData.id}`, {
          method: "DELETE",
        });
      }

      if (response.ok) {
        fetchDepartments();
        setFormData({ id: null, code: "", name: "" });
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
      <h1 className="text-2xl font-bold mb-4">Department Settings</h1>

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
            Add Department
          </button>
          <button
            onClick={() => setAction("update")}
            className={`px-4 py-2 rounded ${
              action === "update" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Update Department
          </button>
          <button
            onClick={() => setAction("delete")}
            className={`px-4 py-2 rounded ${
              action === "delete" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Delete Department
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {action === "add" && "Add New Department"}
          {action === "update" && "Update Existing Department"}
          {action === "delete" && "Delete Department"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {action !== "add" && (
            <select
              onChange={(e) => {
                const selected = departments.find(
                  (dep) => dep.id === Number(e.target.value)
                );
                setFormData({
                  id: selected?.id || null,
                  code: selected?.code || "",
                  name: selected?.name || "",
                });
              }}
              value={formData.id || ""}
              className="border p-2 rounded"
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.code} - {dep.name}
                </option>
              ))}
            </select>
          )}
          {action !== "delete" && (
            <>
              <input
                type="text"
                placeholder="Department Code"
                value={formData.code}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, code: e.target.value }))
                }
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Department Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
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
          {action === "add" && "Add Department"}
          {action === "update" && "Update Department"}
          {action === "delete" && "Delete Department"}
        </button>
      </div>

      {/* Existing Departments */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Departments</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {departments.map((department) => (
              <li
                key={department.id}
                className="flex justify-between py-2 items-center"
              >
                <span>
                  <strong>{department.code}</strong>: {department.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DepartmentSetting;

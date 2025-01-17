import React, { useState, useEffect } from "react";

const DepartmentSetting = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ code: "", name: "" });
  const [action, setAction] = useState("add");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [originalCode, setOriginalCode] = useState("");

  const endpoint = `${import.meta.env.VITE_API_BASE_URL}/departmentsetting`;

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      setError("Failed to load departments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDepartmentSelect = (e) => {
    const selected = departments.find(
      (dep) => dep.department_code === e.target.value
    );
    if (selected) {
      setFormData({
        code: selected.department_code,
        name: selected.department_name,
      });
      setOriginalCode(selected.department_code);
    }
  };

  const handleSubmit = async () => {
    if (!formData.code.trim() || !formData.name.trim()) {
      alert("Both Department Code and Name are required!");
      return;
    }

    if (action === "update" && formData.code !== originalCode) {
      const confirm = window.confirm(
        "Changing department code might affect related data. Are you sure you want to continue?"
      );
      if (!confirm) return;
    }

    try {
      let response;
      if (action === "add") {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: formData.code,
            name: formData.name,
          }),
        });
      } else if (action === "update") {
        response = await fetch(`${endpoint}/${originalCode}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newCode: formData.code,
            name: formData.name,
          }),
        });
      } else if (action === "delete") {
        response = await fetch(`${endpoint}/${formData.code}`, {
          method: "DELETE",
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      await fetchDepartments();
      setFormData({ code: "", name: "" });
      setOriginalCode("");
      alert(data.message || "Action completed successfully!");
    } catch (error) {
      console.error("Error performing action:", error);
      alert(error.message || "An error occurred while performing the action");
    }
  };

  const resetForm = () => {
    setFormData({ code: "", name: "" });
    setOriginalCode("");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Department Settings</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Action Selector */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Select Action</h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setAction("add");
              resetForm();
            }}
            className={`px-4 py-2 rounded ${
              action === "add" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Add Department
          </button>
          <button
            onClick={() => {
              setAction("update");
              resetForm();
            }}
            className={`px-4 py-2 rounded ${
              action === "update" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Update Department
          </button>
          <button
            onClick={() => {
              setAction("delete");
              resetForm();
            }}
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
              onChange={handleDepartmentSelect}
              value={formData.code || ""}
              className="border p-2 rounded"
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dep) => (
                <option key={dep.department_code} value={dep.department_code}>
                  {dep.department_code} - {dep.department_name}
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
                maxLength={20} // Add maxLength to match database constraint
              />
              <input
                type="text"
                placeholder="Department Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border p-2 rounded"
                maxLength={100} // Add maxLength to match database constraint
              />
            </>
          )}
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {action === "add" && "Add Department"}
            {action === "update" && "Update Department"}
            {action === "delete" && "Delete Department"}
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Clear Form
          </button>
        </div>
      </div>

      {/* Existing Departments */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Departments</h2>
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((department) => (
                  <tr key={department.department_code}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {department.department_code}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {department.department_name}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentSetting;

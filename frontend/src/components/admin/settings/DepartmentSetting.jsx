import React, { useState, useEffect } from "react";

// Toast Component
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 p-4 rounded shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white animate-fade-in-out`}
  >
    {message}
    <button onClick={onClose} className="ml-2 text-white font-bold">
      ×
    </button>
  </div>
);

// Confirmation Dialog Component
const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const DepartmentSetting = () => {
  // Existing states
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ code: "", name: "" });
  const [action, setAction] = useState("add");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [originalCode, setOriginalCode] = useState("");

  // New states for enhancements
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("department_code");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    message: "",
    action: null,
  });

  const itemsPerPage = 10;
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}/departmentsetting`;

  // Toast handler
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.code.trim()) errors.code = "Department code is required";
    if (!formData.name.trim()) errors.name = "Department name is required";
    if (formData.code.length > 20)
      errors.code = "Code must be less than 20 characters";
    if (formData.name.length > 100)
      errors.name = "Name must be less than 100 characters";
    return errors;
  };

  // Fetch departments
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
      showToast("Failed to load departments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle department selection
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

  // Handle submit
  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showToast("Please fix the validation errors", "error");
      return;
    }

    if (action === "update" && formData.code !== originalCode) {
      setConfirmDialog({
        isOpen: true,
        message:
          "Changing department code might affect related data. Are you sure you want to continue?",
        action: submitForm,
      });
      return;
    }

    await submitForm();
  };

  // Submit form
  const submitForm = async () => {
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
      resetForm();
      showToast(data.message || "Action completed successfully", "success");
    } catch (error) {
      console.error("Error performing action:", error);
      showToast(error.message || "An error occurred", "error");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ code: "", name: "" });
    setOriginalCode("");
    setValidationErrors({});
  };

  // Filter and sort departments
  const filteredAndSortedDepartments = departments
    .filter(
      (dept) =>
        dept.department_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.department_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        message={confirmDialog.message}
        onConfirm={() => {
          confirmDialog.action();
          setConfirmDialog({ isOpen: false, message: "", action: null });
        }}
        onCancel={() =>
          setConfirmDialog({ isOpen: false, message: "", action: null })
        }
      />

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
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, code: e.target.value }));
                  setValidationErrors((prev) => ({ ...prev, code: "" }));
                }}
                className={`border p-2 rounded ${
                  validationErrors.code ? "border-red-500" : ""
                }`}
                maxLength={20}
              />
              {validationErrors.code && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.code}
                </div>
              )}
              <input
                type="text"
                placeholder="Department Name"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  setValidationErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={`border p-2 rounded ${
                  validationErrors.name ? "border-red-500" : ""
                }`}
                maxLength={100}
              />
              {validationErrors.name && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.name}
                </div>
              )}
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

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search departments..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Departments Table */}
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
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => {
                      setSortDirection(
                        sortField === "department_code" &&
                          sortDirection === "asc"
                          ? "desc"
                          : "asc"
                      );
                      setSortField("department_code");
                    }}
                  >
                    Department Code{" "}
                    {sortField === "department_code" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => {
                      setSortDirection(
                        sortField === "department_name" &&
                          sortDirection === "asc"
                          ? "desc"
                          : "asc"
                      );
                      setSortField("department_name");
                    }}
                  >
                    Department Name{" "}
                    {sortField === "department_name" &&
                      (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((department) => (
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

        {/* Pagination */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({
            length: Math.ceil(
              filteredAndSortedDepartments.length / itemsPerPage
            ),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentSetting;

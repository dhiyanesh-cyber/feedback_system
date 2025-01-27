import React, { useState, useEffect, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";

const FacultySetting = () => {
  // State Management
  const [faculties, setFaculties] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    faculty_name: "",
    dob: "",
    age: "",
    department: "",
    punch_id: "",
  });
  const [action, setAction] = useState("add");
  const [loading, setLoading] = useState(false);

  // Enhanced State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "faculty_name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});

  // Configuration
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}/facultysettings`;
  const itemsPerPage = 10;

  // Calculate Age
  const calculateAge = (dob) => {
    if (!dob) return "";

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Fetch Faculties
  const fetchFaculties = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setFaculties(data);
    } catch (error) {
      toast.error("Failed to fetch faculties");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lifecycle
  useEffect(() => {
    fetchFaculties();
  }, []);

  // Validation Function
  const validateForm = () => {
    const errors = {};

    // Validate code
    if (!formData.code) {
      errors.code = "Faculty code is required";
    } else if (isNaN(formData.code)) {
      errors.code = "Faculty code must be a number";
    }

    // Validate name
    if (!formData.faculty_name) {
      errors.faculty_name = "Faculty name is required";
    }

    // Validate date of birth
    if (formData.dob) {
      const selectedDate = new Date(formData.dob);
      const today = new Date();

      if (selectedDate > today) {
        errors.dob = "Date of birth cannot be in the future";
      }
    }

    return errors;
  };

  // Handle Submit
  const handleSubmit = async () => {
    // Validate form for add and update
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error("Please fix the validation errors");
      return;
    }

    // Prepare data
    const dataToSubmit = {
      ...formData,
      code: Number(formData.code),
      punch_id: formData.punch_id ? Number(formData.punch_id) : null,
      age: formData.dob ? calculateAge(formData.dob) : formData.age,
      dob: formData.dob
        ? new Date(formData.dob).toISOString().split("T")[0]
        : null,
    };

    try {
      let response;
      if (action === "add") {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        });
      } else if (action === "update") {
        response = await fetch(`${endpoint}/${formData.code}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        });
      } else if (action === "delete") {
        response = await fetch(`${endpoint}/${formData.code}`, {
          method: "DELETE",
        });
      }

      const data = await response.json();

      if (response.ok) {
        fetchFaculties();
        resetForm();
        toast.success(data.message || "Action completed successfully");
      } else {
        toast.error(data.message || "Failed to perform action");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Submit error:", error);
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      code: "",
      faculty_name: "",
      dob: "",
      age: "",
      department: "",
      punch_id: "",
    });
    setValidationErrors({});
  };

  // Handle Faculty Selection
  const handleFacultySelect = (selectedCode) => {
    // Find the selected faculty
    const selected = faculties.find(

      (faculty) => { return faculty.code === Number(selectedCode) }
    );

    // If faculty found, set the form data
    if (selected) {
      setFormData({
        code: selected.code,
        faculty_name: selected.faculty_name,
        dob: selected.dob
          ? new Date(selected.dob).toISOString().split("T")[0]
          : "",
        age: selected.age,
        department: selected.department || "",
        punch_id: selected.punch_id || "",
      });
    } else {
      // If no faculty found, reset the form
      resetForm();
    }
  };

  // Memoized and Filtered Data
  const processedFaculties = useMemo(() => {
    // Filter
    let result = faculties.filter(
      (faculty) =>
        faculty.faculty_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.code.toString().includes(searchTerm.toLowerCase())
    );

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      return sortConfig.direction === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    return result;
  }, [faculties, searchTerm, sortConfig]);

  // Pagination
  const paginatedFaculties = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return processedFaculties.slice(firstPageIndex, lastPageIndex);
  }, [processedFaculties, currentPage]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      {/* Toaster for notifications */}
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-4">Faculty Management</h1>

      {/* Action Selector */}
      <div className="mb-6 flex gap-4">
        {["add", "update", "delete"].map((currentAction) => (
          <button
            key={currentAction}
            onClick={() => {
              setAction(currentAction);
              resetForm();
            }}
            className={`px-4 py-2 rounded capitalize ${action === currentAction ? "bg-black text-white" : "bg-gray-200"
              }`}
          >
            {currentAction} Faculty
          </button>
        ))}
      </div>

      {/* Form Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Faculty Selection for Update/Delete */}
          {(action === "update" || action === "delete") && (
            <div className="col-span-full">
              <select
                onChange={(e) => handleFacultySelect(e.target.value)}
                value={formData.code || ""}
                className="border p-2 rounded w-full"
              >
                <option value="" disabled>
                  Select Faculty
                </option>
                {faculties.map((faculty) => (
                  <option
                    key={`faculty-select-${faculty.code}`}
                    value={faculty.code}
                  >
                    {faculty.code} - {faculty.faculty_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Input Fields for Add/Update */}
          {action !== "delete" && (
            <>
              {/* Code Input */}
              <div>
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
                  className={`border p-2 rounded w-full ${validationErrors.code ? "border-red-500" : ""
                    }`}
                />
                {validationErrors.code && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.code}
                  </p>
                )}
              </div>

              {/* Name Input */}
              <div>
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
                  className={`border p-2 rounded w-full ${validationErrors.faculty_name ? "border-red-500" : ""
                    }`}
                />
                {validationErrors.faculty_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.faculty_name}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      dob: selectedDate,
                      age: selectedDate ? calculateAge(selectedDate) : "",
                    }));
                  }}
                  className={`border p-2 rounded w-full ${validationErrors.dob ? "border-red-500" : ""
                    }`}
                />
                {validationErrors.dob && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.dob}
                  </p>
                )}
              </div>

              {/* Department */}
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

              {/* Punch ID */}
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

        {/* Submit Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            disabled={action !== "delete" && !formData.code}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)} Faculty
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search faculties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Faculty Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              {[
                { key: "code", label: "Code" },
                { key: "faculty_name", label: "Name" },
                { key: "dob", label: "DOB" },
                { key: "age", label: "Age" },
                { key: "department", label: "Department" },
                { key: "punch_id", label: "Punch ID" },
              ].map(({ key, label }) => (
                <th
                  key={`header-${key}`}
                  className="p-2 cursor-pointer"
                  onClick={() =>
                    setSortConfig((prev) => ({
                      key,
                      direction:
                        prev.key === key && prev.direction === "ascending"
                          ? "descending"
                          : "ascending",
                    }))
                  }
                >
                  {label}
                  {sortConfig.key === key && (
                    <span>
                      {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedFaculties.map((faculty) => (
              <tr key={`faculty-${faculty.code}`} className="border-b">
                <td className="p-2">{faculty.code}</td>
                <td className="p-2">{faculty.faculty_name}</td>
                <td className="p-2">
                  {faculty.dob
                    ? new Date(faculty.dob).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-2">{faculty.age}</td>
                <td className="p-2">{faculty.department}</td>
                <td className="p-2">{faculty.punch_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({
          length: Math.ceil(processedFaculties.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={`page-${index + 1}`}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FacultySetting;

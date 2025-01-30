import React, { useState, useEffect, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";

const StudentSetting = () => {
  // State Management
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    student_department: "",
    student_dob: "",
    student_year: "",
    class: "",
  });
  const [action, setAction] = useState("add");
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "student_id",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);

  // Configuration
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}/studentsettings`;
  const itemsPerPage = 10;

  // Fetch students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      toast.error("Failed to fetch students");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setIsStudentDropdownOpen(false);
        setIsDepartmentDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.student_id) errors.student_id = "Student ID is required";
    if (!formData.student_name) errors.student_name = "Student name is required";
    if (formData.student_dob) {
      const dob = new Date(formData.student_dob);
      if (dob > new Date()) {
        errors.student_dob = "Date of birth cannot be in the future";
      }
    }
    return errors;
  };

  // Get unique departments and years
  const departments = useMemo(
    () => [...new Set(students.map((s) => s.student_department))],
    [students]
  );
  const years = useMemo(
    () => [...new Set(students.map((s) => s.student_year))],
    [students]
  );

  // Filtered students for dropdown
  const filteredStudentsForDropdown = useMemo(() => {
    return students.filter(
      (student) =>
        student.student_name
          .toLowerCase()
          .includes(studentSearchTerm.toLowerCase()) ||
        student.student_id.toString().includes(studentSearchTerm.toLowerCase())
    );
  }, [students, studentSearchTerm]);

  // Filtered departments for dropdown
  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) =>
      dept.toLowerCase().includes(departmentSearchTerm.toLowerCase())
    );
  }, [departments, departmentSearchTerm]);

  // Custom Dropdown Component for Students
  const StudentDropdown = () => (
    <div className="relative">
      <div
        className="border p-2 rounded w-full cursor-pointer"
        onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
      >
        {formData.student_id
          ? `${formData.student_id} - ${formData.student_name}`
          : "Select Student"}
      </div>

      {isStudentDropdownOpen && (
        <div className="absolute z-10 w-full bg-white border rounded-b shadow-lg max-h-60 overflow-y-auto">
          <div className="sticky top-0 bg-white p-2">
            <input
              type="text"
              placeholder="Search students..."
              value={studentSearchTerm}
              onChange={(e) => setStudentSearchTerm(e.target.value)}
              className="border p-2 rounded w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {filteredStudentsForDropdown.map((student) => (
            <div
              key={student.student_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFormData(student);
                setIsStudentDropdownOpen(false);
              }}
            >
              {student.student_id} - {student.student_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Custom Dropdown Component for Departments
  const DepartmentDropdown = () => (
    <div className="relative">
      <div
        className="border p-2 rounded w-full cursor-pointer"
        onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
      >
        {formData.student_department || "Select Department"}
      </div>

      {isDepartmentDropdownOpen && (
        <div className="absolute z-10 w-full bg-white border rounded-b shadow-lg max-h-60 overflow-y-auto">
          <div className="sticky top-0 bg-white p-2">
            <input
              type="text"
              placeholder="Search departments..."
              value={departmentSearchTerm}
              onChange={(e) => setDepartmentSearchTerm(e.target.value)}
              className="border p-2 rounded w-full"
              // onClick={(e) => e.stopPropagation()}
            />
          </div>
          {filteredDepartments.map((dept) => (
            <div
              key={dept}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFormData((prev) => ({ ...prev, student_department: dept }));
                setIsDepartmentDropdownOpen(false);
              }}
            >
              {dept}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Handle CSV Upload
  const handleCsvUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      toast.error("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await fetch(`${endpoint}/bulk-upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        
        setUploadResult(result);
        fetchStudents();
        toast.success(`${result.summary.totalProcessed - result.summary.failedUploads - result.summary.invalidEntries} students uploaded successfully`);
        setCsvFile(null);
      } else {
        toast.error(result.message || "Failed to upload students");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred during upload");
    }
  };

  // Handle Bulk Delete
  const handleBulkDelete = async () => {
    if (!selectedYear || !selectedDepartment) {
      toast.error("Please select both year and department for bulk deletion");
      return;
    }

    try {
      const response = await fetch(`${endpoint}/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: selectedYear,
          department: selectedDepartment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchStudents();
        toast.success(`${data.deletedCount} students deleted successfully`);
        setSelectedYear("");
        setSelectedDepartment("");
      } else {
        toast.error(data.message || "Failed to delete students");
      }
    } catch (error) {
      console.error("Bulk delete error:", error);
      toast.error("An error occurred during bulk deletion");
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    if (action !== "delete") {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        toast.error("Please fix the validation errors");
        return;
      }
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
        response = await fetch(`${endpoint}/${formData.student_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else if (action === "delete") {
        response = await fetch(`${endpoint}/${formData.student_id}`, {
          method: "DELETE",
        });
      }

      const data = await response.json();

      if (response.ok) {
        fetchStudents();
        resetForm();
        toast.success(data.message || "Action completed successfully");
      } else {
        toast.error(data.message || "Failed to perform action");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred");
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      student_id: "",
      student_name: "",
      student_department: "",
      student_dob: "",
      student_year: "",
      class: "",
    });
    setValidationErrors({});
  };

  // Filtered and Sorted Students
  const processedStudents = useMemo(() => {
    return students
      .filter(
        (student) =>
          student.student_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.student_id.toString().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
  }, [students, searchTerm, sortConfig]);

  // Pagination
  const paginatedStudents = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return processedStudents.slice(firstPageIndex, lastPageIndex);
  }, [processedStudents, currentPage]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-4">Student Settings</h1>

      {/* Action Selector */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Select Action</h2>
        <div className="flex flex-wrap gap-4">
          {["add", "update", "delete", "bulkAdd", "bulkDelete"].map(
            (actionType) => (
              <button
                key={actionType}
                onClick={() => {
                  setAction(actionType);
                  resetForm();
                }}
                className={`px-4 py-2 rounded capitalize ${action === actionType ? "bg-black text-white" : "bg-gray-200"
                  }`}
              >
                {actionType.replace(/([A-Z])/g, " $1").trim()}
              </button>
            )
          )}
        </div>
      </div>

      {/* Regular Form */}
      {["add", "update", "delete"].includes(action) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            {action.charAt(0).toUpperCase() + action.slice(1)} Student
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {action !== "add" && (
              <div className="space-y-2">
                <StudentDropdown />
              </div>
            )}

            {action !== "delete" && (
              <>
                <input
                  type="text"
                  placeholder="Student ID"
                  value={formData.student_id}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      student_id: e.target.value,
                    }))
                  }
                  disabled={action === "update"}
                  className={`border p-2 rounded ${validationErrors.student_id ? "border-red-500" : ""
                    }`}
                />
                {validationErrors.student_id && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.student_id}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Student Name"
                  value={formData.student_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      student_name: e.target.value,
                    }))
                  }
                  className={`border p-2 rounded ${validationErrors.student_name ? "border-red-500" : ""
                    }`}
                />
                {validationErrors.student_name && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.student_name}
                  </p>
                )}

                <DepartmentDropdown />

                <input
                  type="date"
                  value={formData.student_dob}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      student_dob: e.target.value,
                    }))
                  }
                  className={`border p-2 rounded ${validationErrors.student_dob ? "border-red-500" : ""
                    }`}
                />
                {validationErrors.student_dob && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.student_dob}
                  </p>
                )}

                <input
                  type="number"
                  placeholder="Year"
                  value={formData.student_year}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      student_year: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Class"
                  value={formData.class}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      class: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
              </>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {action.charAt(0).toUpperCase() + action.slice(1)} Student
          </button>
        </div>
      )}

      {/* Bulk Add (CSV Upload) */}
      {action === "bulkAdd" && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Bulk Add Students</h2>
          <div className="space-y-4">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files[0])}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleCsvUpload}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Upload CSV
            </button>

            {uploadResult && (
              <div className="mt-4 bg-gray-100 p-4 rounded">
                <h3 className="font-bold">Upload Results</h3>
                <p>Total Students: {uploadResult.summary.totalProcessed}</p>
                <p>Successfully Added: {uploadResult.summary.totalProcessed - uploadResult.summary.failedUploads - uploadResult.summary.invalidEntries}</p>
                {uploadResult.details.failedInserts.length > 0 && (
                  <div className="text-red-600">
                    <h4>Failed Inserts:</h4>
                    <ul>
                      {uploadResult.details.failedInserts.map((fail, index) => (
                        <li key={index}>
                          Student ID: {fail.student.student_id} - {fail.error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulk Delete */}
      {action === "bulkDelete" && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Bulk Delete Students</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleBulkDelete}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Bulk Delete Students
          </button>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: "student_id", label: "ID" },
                { key: "student_name", label: "Name" },
                { key: "student_department", label: "Department" },
                { key: "student_dob", label: "DOB" },
                { key: "student_year", label: "Year" },
                { key: "class", label: "Class" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() =>
                    setSortConfig({
                      key,
                      direction:
                        sortConfig.key === key &&
                          sortConfig.direction === "ascending"
                          ? "descending"
                          : "ascending",
                    })
                  }
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.student_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.student_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.student_department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(student.student_dob).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.student_year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        {/* Previous page arrow */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          &lt;&lt;
        </button>

        {/* Page numbers */}
        {Array.from({ length: Math.ceil(processedStudents.length / itemsPerPage) })
          .map((_, index) => {
            const pageNumber = index + 1;
            // Show current page and 1 page before and after
            if (
              pageNumber === currentPage ||
              pageNumber === currentPage - 1 ||
              pageNumber === currentPage + 1 ||
              pageNumber === 1 ||
              pageNumber === Math.ceil(processedStudents.length / itemsPerPage)
            ) {
              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-1 rounded ${currentPage === pageNumber
                      ? "bg-black text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <span key={index} className="px-2">
                  ...
                </span>
              );
            }
            return null;
          })
          .filter(Boolean)}

        {/* Next page arrow */}
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(processedStudents.length / itemsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(processedStudents.length / itemsPerPage)
          }
          className={`px-3 py-1 rounded ${currentPage === Math.ceil(processedStudents.length / itemsPerPage)
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default StudentSetting;
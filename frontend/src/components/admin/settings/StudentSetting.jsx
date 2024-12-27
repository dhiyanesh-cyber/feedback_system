import React, { useState, useEffect } from "react";

const StudentSetting = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    student_id: "",
    student_name: "",
    student_department: "",
    student_dob: "",
    student_year: "",
    class: "",
  });
  const [action, setAction] = useState("add"); // "add", "update", "delete", "bulkAdd", "bulkDelete"
  const [loading, setLoading] = useState(false);

  const [yearList, setYearList] = useState([]); // Dropdown options for years
  const [departmentList, setDepartmentList] = useState([]); // Dropdown options for departments
  const [selectedYear, setSelectedYear] = useState(""); // Selected year for bulk delete
  const [selectedDepartment, setSelectedDepartment] = useState(""); // Selected department for bulk delete

  const endpoint = "/api/studentsettings"; // Replace with your actual API endpoint

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Populate dropdown lists for year and department
    const uniqueYears = [...new Set(students.map((stu) => stu.student_year))];
    const uniqueDepartments = [
      ...new Set(students.map((stu) => stu.student_department)),
    ];
    setYearList(uniqueYears);
    setDepartmentList(uniqueDepartments);
  }, [students]);

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (action !== "delete" && !formData.student_id.trim()) {
      alert("Student ID is required!");
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
        fetchStudents();
        setFormData({
          id: null,
          student_id: "",
          student_name: "",
          student_department: "",
          student_dob: "",
          student_year: "",
          class: "",
        });
        alert("Action completed successfully!");
      } else {
        console.error("Failed to perform the action");
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (!selectedYear || !selectedDepartment) {
      alert("Please select both year and department for bulk deletion!");
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

      if (response.ok) {
        fetchStudents();
        alert("Bulk deletion successful!");
      } else {
        console.error("Bulk deletion failed");
      }
    } catch (error) {
      console.error("Error during bulk deletion:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Student Settings</h1>

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
            Add Student
          </button>
          <button
            onClick={() => setAction("update")}
            className={`px-4 py-2 rounded ${
              action === "update" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Update Student
          </button>
          <button
            onClick={() => setAction("delete")}
            className={`px-4 py-2 rounded ${
              action === "delete" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Delete Student
          </button>
          <button
            onClick={() => setAction("bulkAdd")}
            className={`px-4 py-2 rounded ${
              action === "bulkAdd" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Bulk Add Students
          </button>
          <button
            onClick={() => setAction("bulkDelete")}
            className={`px-4 py-2 rounded ${
              action === "bulkDelete" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Bulk Delete Students
          </button>
        </div>
      </div>

      {/* Form Section */}
      {action !== "bulkAdd" && action !== "bulkDelete" && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            {action === "add" && "Add New Student"}
            {action === "update" && "Update Existing Student"}
            {action === "delete" && "Delete Student"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {action !== "add" && (
              <select
                onChange={(e) => {
                  const selected = students.find(
                    (stu) => stu.id === Number(e.target.value)
                  );
                  setFormData(selected || {});
                }}
                value={formData.id || ""}
                className="border p-2 rounded"
              >
                <option value="" disabled>
                  Select Student
                </option>
                {students.map((stu) => (
                  <option key={stu.id} value={stu.id}>
                    {stu.student_id} - {stu.student_name}
                  </option>
                ))}
              </select>
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
                  className="border p-2 rounded"
                />
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
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={formData.student_department}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      student_department: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  value={formData.student_dob}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      student_dob: e.target.value,
                    }))
                  }
                  className="border p-2 rounded"
                />
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
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-black"
          >
            {action === "add" && "Add Student"}
            {action === "update" && "Update Student"}
            {action === "delete" && "Delete Student"}
          </button>
        </div>
      )}

      {/* Bulk Delete Section */}
      {action === "bulkDelete" && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Bulk Delete Students</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="" disabled>
                Select Year
              </option>
              {yearList.map((year) => (
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
              <option value="" disabled>
                Select Department
              </option>
              {departmentList.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleBulkDelete}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-black"
          >
            Bulk Delete Students
          </button>
        </div>
      )}

      {/* Existing Students */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Students</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {students.map((student) => (
              <li
                key={student.id}
                className="flex justify-between py-2 items-center"
              >
                <span>
                  <strong>{student.student_id}</strong>: {student.student_name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentSetting;

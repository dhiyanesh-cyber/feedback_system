import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchForms, createForm, deleteForm } from "../../services/formApi";
import { getAllSubjects } from "../../services/subjectApi";
import { getAllFaculty } from "../../services/facultyApi";
import Navbar from "../../components/Nabvbar";
import FacultyFormComponent from "./FacultyFormComponent";
import { getStudents } from "../../services/studentApi";

const AdminFormsPage = () => {
  const { department_id, year_id, class_id } = useParams();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    staff_id: "",
    subject_id: "",
  });
  const [facultyIds, setFacultyIds] = useState([]);
  const [subjectIds, setSubjectIds] = useState([]);
  const [facultySearch, setFacultySearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [isFacultySelected, setIsFacultySelected] = useState(false);
  const [isSubjectSelected, setIsSubjectSelected] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState(""); // New state for student search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await fetchForms(department_id, year_id, class_id);
        setForms(formData);

        
        const studentsData = await getStudents(department_id, year_id, class_id);

        setStudents(studentsData);

        const facultyData = await getAllFaculty();
        setFacultyIds(facultyData);

        const subjectData = await getAllSubjects();
        setSubjectIds(subjectData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [department_id, year_id, class_id]);

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSelectAllStudents = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.student_id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    if (!formData.staff_id || !formData.subject_id || selectedStudents.length === 0) {
      setError("Please fill all required fields and select at least one student");
      return;
    }

    try {
      const data = await createForm(
        department_id,
        year_id,
        class_id,
        formData.staff_id,
        formData.subject_id,
        selectedStudents
      );

      setForms((prevForms) => [...prevForms, data.form]);

      // Reset all states
      setFormData({ staff_id: "", subject_id: "" });
      setFacultySearch("");
      setSubjectSearch("");
      setIsFacultySelected(false);
      setIsSubjectSelected(false);
      setSelectedStudents([]);
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error("Error adding form:", err);
      setError(err.message);
    }
  };

  const handleDelete = async (form_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this form?"
    );
    if (isConfirmed) {
      try {
        await deleteForm(form_id);
        setForms((prevForms) =>
          prevForms.filter((form) => form.form_id !== form_id)
        );
      } catch (err) {
        console.error("Error deleting form:", err);
        setError(err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ staff_id: "", subject_id: "" });
    setFacultySearch("");
    setSubjectSearch("");
    setIsFacultySelected(false);
    setIsSubjectSelected(false);
    setSelectedStudents([]);
    setError(null);
  };

  const renderStudentSelection = () => {
    // Filter students based on the search term
    const filteredStudents = students.filter(
      (student) =>
        student.student_name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.student_id.toString().includes(studentSearch.toLowerCase())
    );

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium text-md text-gray-900">
            Select Students
          </label>
          <button
            onClick={handleSelectAllStudents}
            className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            {selectedStudents.length === students.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>
        {/* Add search input for students */}
        <input
          type="text"
          placeholder="Search students..."
          value={studentSearch}
          onChange={(e) =>
            setStudentSearch(e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
        />
        <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg">
          {filteredStudents.map((student) => (
            <div
              key={student.student_id}
              className="flex items-center p-2 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                id={`student-${student.student_id}`}
                checked={selectedStudents.toString().includes(student.student_id)}
                onChange={() => handleStudentSelection(student.student_id)}
                className="mr-2 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`student-${student.student_id}`}
                className="flex-1 cursor-pointer"
              >
                {student.student_name} ({student.student_id})
              </label>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {selectedStudents.length} students selected
        </p>
      </div>
    );
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading forms...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-start justify-start min-h-screen bg-gray-100 p-10 max-w-screen">
        <h2 className="text-3xl font-normal text-center text-black opacity-90 mb-6">
          Forms for{" "}
          <span className="font-bold">
            {department_id}, Year: {year_id}, Class: {class_id}
          </span>
        </h2>
        <ul className="flex flex-wrap flex-row justify-center gap-4 overflow-hidden">
          {forms.map((form) => (
            <FacultyFormComponent
              key={form.form_id}
              form={form}
              onDelete={handleDelete}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
          ))}
        </ul>

        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-customGray text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-gray-700 transition"
        >
          +
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 relative">
              <h2 className="text-2xl font-bold text-center text-black opacity-90 mb-4">
                Add Details for Class: {class_id}
              </h2>
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div className="flex flex-col relative">
                  <label className="font-medium text-md text-gray-900 mb-1">
                    Search Staff
                  </label>
                  <input
                    type="text"
                    placeholder="Type to search staff"
                    value={facultySearch}
                    onChange={(e) => {
                      setFacultySearch(e.target.value);
                      setIsFacultySelected(false);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                  />
                  {facultySearch && !isFacultySelected && (
                    <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
                      {facultyIds
                        .filter(
                          (faculty) =>
                            faculty.faculty_name
                              .toLowerCase()
                              .includes(facultySearch.toLowerCase()) ||
                            faculty.code
                              .toString()
                              .includes(facultySearch.toLowerCase())
                        )
                        .map((faculty) => (
                          <li
                            key={faculty.code}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                staff_id: faculty.code,
                              });
                              setFacultySearch(faculty.faculty_name);
                              setIsFacultySelected(true);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          >
                            {faculty.faculty_name} ({faculty.code})
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col relative">
                  <label className="font-medium text-md text-gray-900 mb-1">
                    Search Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Type to search subject"
                    value={subjectSearch}
                    onChange={(e) => {
                      setSubjectSearch(e.target.value);
                      setIsSubjectSelected(false);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                  />
                  {subjectSearch && !isSubjectSelected && (
                    <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
                      {subjectIds
                        .filter(
                          (subject) =>
                            subject.sub_name
                              .toLowerCase()
                              .includes(subjectSearch.toLowerCase()) ||
                            subject.sub_code
                              .toLowerCase()
                              .includes(subjectSearch.toLowerCase())
                        )
                        .map((subject) => (
                          <li
                            key={subject.sub_code}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                subject_id: subject.sub_code,
                              });
                              setSubjectSearch(subject.sub_name);
                              setIsSubjectSelected(true);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          >
                            {subject.sub_name} ({subject.sub_code})
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                {renderStudentSelection()}

                <button
                  onClick={handleCreate}
                  className="mt-4 w-full px-3 py-2 bg-customGray text-white font-normal rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  Add
                </button>
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-red-600 text-2xl font-normal"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminFormsPage;
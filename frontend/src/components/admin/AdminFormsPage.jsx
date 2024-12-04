import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchForms, createForm, deleteForm } from "../../services/formApi";
import Navbar from "../../components/Nabvbar";
import FacultyFormComponent from "./FacultyFormComponent";

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

  // Fetch forms when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchForms(department_id, year_id, class_id);
        setForms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [department_id, year_id, class_id]);

  // Handle input change for form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form creation
  const handleCreate = async () => {
    try {
      const data = await createForm(
        department_id,
        year_id,
        class_id,
        formData.staff_id,
        formData.subject_id
      );

      // Directly add the newly created form to the forms state
      setForms((prevForms) => [...prevForms, data.form]);
      setFormData({
        staff_id: "",
        subject_id: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error("Error adding form:", err);
      setFormData({
        staff_id: "",
        subject_id: "",
      });
      setError(err.message);
    }
  };

  // Handle form deletion with confirmation
  const handleDelete = async (form_id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this form?");
    if (isConfirmed) {
      try {
        await deleteForm(form_id); // Proceed with form deletion
        // Immediately update the UI by removing the form
        setForms((prevForms) => prevForms.filter((form) => form.form_id !== form_id));
      } catch (err) {
        console.error("Error deleting form:", err);
        setError(err.message); // Handle error
      }
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading forms...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-start justify-start min-h-screen bg-gray-100 p-10">
        <div className="flex flex-col items-start justify-start p-8">
          <h2 className="text-3xl font-normal text-center text-black opacity-90 mb-6">
            Forms for <span className="font-bold">{department_id}, {year_id}th Year, Class: {class_id}</span>
          </h2>
          <ul className="space-x-4 flex flex-row">
            {forms.map((form) => (
              <FacultyFormComponent key={form.form_id} form={form} onDelete={handleDelete} />
            ))}
          </ul>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-customGray text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-gray-700 transition"
        >
          +
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-center text-black opacity-90 mb-4">
                Add Details for Class: {class_id}
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="font-medium text-md text-gray-900 mb-1">Staff ID</label>
                  <input
                    type="text"
                    name="staff_id"
                    value={formData.staff_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-md text-gray-900 mb-1">Subject ID</label>
                  <input
                    type="text"
                    name="subject_id"
                    value={formData.subject_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                  />
                </div>
                <button
                  onClick={handleCreate}
                  className="mt-4 w-full px-3 py-2 bg-customGray text-white font-normal rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  Add
                </button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-red-600 text-2xl font-normal"
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

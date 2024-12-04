import React from 'react'
import { useNavigate } from 'react-router-dom';

const FormCard = ({form}) => {
    const navigate = useNavigate();
    const handleFormClick = async (form_id) => {
        try {
          navigate(`/student-panel/${JSON.parse(localStorage.getItem("userDetails")).registrationNumber}/form/${form_id}`);
        } catch (error) {
          console.log("Error while navigating : ", error);
          
        }
      }
  return (
    <li
    
    className={`p-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-black text-center w-full  ${form.status === 'filled' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
    onClick={() => handleFormClick(form.form_id)}
    disabled={form.status === 'filled'}
  >
    <p>
      <strong>Subject Code:</strong> {form.subject_id}
    </p>
    <p>
      <strong>Faculty ID:</strong> {form.faculty_id}
    </p>
  </li>
  )
}

export default FormCard
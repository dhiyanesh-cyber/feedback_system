import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchFacultyDetails } from '../../services/facultyApi';
import { fetchSubjectDetails } from '../../services/subjectApi';
import StudentPanel from '../../pages/student/StudentPanel';

const FormCard = ({ form }) => {

  const [facultyDetails, setFacultyDetails] = useState({})
  const [subjectDetails, setSubjectDetails] = useState({})

  useEffect(() => {

    const getFacultyDetails = async () => {
      const facultyResponse = await fetchFacultyDetails(form.faculty_id)
      setFacultyDetails(facultyResponse[0]);
    }

    const getSubjectDetails = async () => {
      const subjectResponse = await fetchSubjectDetails(form.subject_id)
      setSubjectDetails(subjectResponse[0]);
    }



    getFacultyDetails();
    getSubjectDetails();

  }, [])

  const navigate = useNavigate();
  const handleFormClick = async (form_id) => {
    try {
      navigate(`/student-panel/${JSON.parse(localStorage.getItem("userDetails")).registrationNumber}/form/${form_id}`, {
        state: {
          facultyDetails,
          subjectDetails
        }
      });
    } catch (error) {
      console.log("Error while navigating : ", error);

    }
  }


  return (
    <button

      className={`p-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-black text-center w-full  ${form.status === 'filled' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
      onClick={() => handleFormClick(form.form_id)}
      disabled={form.status === 'filled'}
    >

      <p>
        <strong>Faculty :</strong> {facultyDetails.faculty_name}
      </p>
      <p>
        <strong>Subject :</strong> {subjectDetails.sub_name} ({form.subject_id})
      </p>

    </button>
  )
}

export default FormCard
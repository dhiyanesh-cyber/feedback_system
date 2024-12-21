import React, { useState, useEffect } from 'react'
import { fetchFacultyDetails } from '../../services/facultyApi'
import { fetchSubjectDetails } from '../../services/subjectApi'


const FacultyFormComponent = ({ form, onDelete }) => {
    const [facultyDetails, setFacultyDetails] = useState(null)
    const [subjectDetails, setSubjectDetails] = useState(null)

    useEffect(() => {
        console.log(form);
        

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


    return (
        <li className="p-4 pb-0 px-0 bg-white border-2 border-gray-300 rounded-lg text-black text-center w-60 flex flex-col justify-between">
            {
                subjectDetails ? <><p className="font-semibold">{subjectDetails.sub_name}</p> <p>({form.subject_id})</p> </> : <p>Loading Subject...</p>
            }
            {
                facultyDetails ? <><p className="font-semibold">{facultyDetails.faculty_name}</p> <p>({form.faculty_id})</p> </> : <p>Loading faculty...</p>
            }

            {onDelete && (
                <button
                    onClick={() => onDelete(form.form_id)}
                    className="ml-auto mt-3 px-2 w-full py-1 rounded rounded-t-none bg-red-600 text-white hover:bg-red-800 transition"
                    title="Delete Form">
                    Delete
                </button>
            )
            }
        </li>
    )


}

export default FacultyFormComponent
import React, { useState, useEffect } from 'react'
import { fetchFacultyDetails } from '../../services/facultyApi'


const FacultyFormComponent = ({form, onDelete}) => {
    const [facultyDetails, setFacultyDetails] = useState(null)

    useEffect(() => {

        const getFacultyDetails = async () => {
            
            const facultyResponse = await fetchFacultyDetails(form.faculty_id)
            // const facultyData = await facultyResponse.json();
            console.log("Inside cmp : ",facultyResponse);
            
            setFacultyDetails(facultyResponse[0]);
        }

        getFacultyDetails();

    }, [])
    

    return (
        <li
            className="p-4 bg-white border-2 border-gray-300 rounded-lg text-black text-center w-60 place-self-center"
        >
            <p>{form.subject_id}</p>
            {
                facultyDetails ? <><p className="font-semibold">{facultyDetails.faculty_name  }</p> <p>({form.faculty_id})</p> </>: <p>Loading faculty...</p>
            }
            
            {onDelete && (
                <button
                onClick={() => onDelete(form.form_id)}
                className="ml-auto text-red-600 hover:text-red-800 transition"
                title="Delete Form">
                    🗑️
                    </button>
                )}
        </li>
    )

    
}

export default FacultyFormComponent
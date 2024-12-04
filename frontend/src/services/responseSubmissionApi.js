const BASE_URL = "http://localhost:3000/api"; 

// Function to validate admin login
export const postStudentResponse = async (student_responses) => {   
  try {

    
    student_responses.map(async (student_response) => {
        const response = await fetch(`${BASE_URL}/studentResponse`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
              },
            body: JSON.stringify({
                student_register_number: student_response.student_id,
                question_id: student_response.question_id,
                response: student_response.response,
                form_id: student_response.form_id
            })
        });

        const data = await response.json();
        console.log(data);
    })

    

    

  } catch (error) {
    console.log(error);
    
    throw new Error(error.response?.data?.message || "Unable to post student response data");
  }
};

export const getFormResponseStatus = async (form_id) => {
    const student_id = JSON.parse(localStorage.getItem("userDetails")).registrationNumber;
    console.log(`${BASE_URL}/studentResponse/${student_id}/${form_id}`);
    
    const response = await fetch(`${BASE_URL}/studentResponse/${student_id}/${form_id}`);
    const status = await response.json();
    console.log("in api: " + status.status);
    
    return status;
}

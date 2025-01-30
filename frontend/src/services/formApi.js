// Used in students side to fetch all forms respective to the student
export const fetchForms = async (department_id, year_id, class_id) => {
  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/studentForms/${department_id}/${year_id}/${class_id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch forms.");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};


export const fetchFormsByStudentId = async (student_id) => {
  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/studentForms/student/${student_id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch forms.");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};




export const getFormById = async (form_id) => {
  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/studentForms/${form_id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch form details.");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};



export const createForm = async (department_id, year_id, class_id, staff_id, subject_id, selectedStudents) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/studentForms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department_code: department_id,
        year: year_id,
        class_name: class_id,
        staff_id,
        subject_id,
        selectedStudents
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add form.");
    }

    const data = await response.json();
    console.log("Create form : ", data);

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteForm = async (form_id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/studentForms/${form_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete form.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};



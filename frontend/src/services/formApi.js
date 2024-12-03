// src/api.js

export const fetchForms = async (department_id, year_id, class_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/studentForms/${department_id}/${year_id}/${class_id}`
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
  
  export const createForm = async (department_id, year_id, class_id, staff_id, subject_id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/studentForms`, {
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
  
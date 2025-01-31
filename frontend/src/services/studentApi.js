// Desc: Service to fetch student details from the backend
// Used in admin panel to list all the students
export const getStudents = async (department_code, year, class_no) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/students/${department_code}/${year}/${class_no}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch student details.");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}


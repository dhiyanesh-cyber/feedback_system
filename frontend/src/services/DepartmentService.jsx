export const getDepartments = async () => {
  try {
    const response = await fetch("http://localhost:3000/departments");
    if (!response.ok) throw new Error("Failed to fetch departments");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch data for a specific department and year
export const getDepartmentYearData = async (departmentCode, year) => {
  try {
    const response = await fetch(`http://localhost:3000/departments/${departmentCode}/years/${year}`);
    if (!response.ok) throw new Error(`Failed to fetch data for ${departmentCode} in ${year}`);
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

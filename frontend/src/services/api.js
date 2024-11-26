export const fetchDepartments = async () => {
  const response = await fetch("http://localhost:3000/api/departments/");
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  return await response.json();
};


export const fetchDetailsByEndpoint = async (endpoint) => {
  const response = await fetch(`http://localhost:3000${endpoint}`);
  return response.json();
};

import React, { createContext, useState } from "react";

// Create the context
export const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <DepartmentContext.Provider
      value={{ selectedDepartment, setSelectedDepartment, selectedYear, setSelectedYear }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

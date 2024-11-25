import React, { createContext, useState, useContext } from "react";

export const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <DepartmentContext.Provider
      value={{
        selectedDepartment,
        setSelectedDepartment,
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartmentContext = () => {
  return useContext(DepartmentContext);
};

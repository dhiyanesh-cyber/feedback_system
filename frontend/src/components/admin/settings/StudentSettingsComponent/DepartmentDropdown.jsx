import { useState } from "react";

const DepartmentDropdown = ({ departments, setFormData }) => {
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Type to search department"
        value={departmentSearch}
        onChange={(e) => {
          setDepartmentSearch(e.target.value);
          setIsDropdownOpen(true); // Opens dropdown while typing
        }}
        onFocus={() => setIsDropdownOpen(true)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
      />

      {isDropdownOpen && departmentSearch && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
          {departments
            .filter((dept) =>
              dept.toLowerCase().includes(departmentSearch.toLowerCase())
            )
            .map((dept) => (
              <li
                key={dept}
                onMouseDown={(e) => e.preventDefault()} // Prevents focus loss
                onClick={() => {
                  setFormData((prev) => ({ ...prev, student_department: dept }));
                  setDepartmentSearch(dept);
                  setIsDropdownOpen(false); // Closes dropdown after selection
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {dept}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DepartmentDropdown;

import { useState } from "react";

const StudentDropdown = ({ students, setFormData }) => {
  const [studentSearch, setStudentSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    setStudentSearch(e.target.value);
    setIsDropdownOpen(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Type to search student"
        value={studentSearch}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
      />

      {isDropdownOpen && studentSearch && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
          {students
            .filter(
              (student) =>
                student.student_name
                  .toLowerCase()
                  .includes(studentSearch.toLowerCase()) ||
                student.student_id.toString().includes(studentSearch.toLowerCase())
            )
            .map((student) => (
              <li
                key={student.student_id}
                onMouseDown={(e) => e.preventDefault()} // Prevents the input from losing focus
                onClick={() => {
                  setFormData({
                    student_id: student.student_id,
                    student_name: student.student_name,
                  });
                  setStudentSearch(student.student_name);
                  setIsDropdownOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {student.student_name} ({student.student_id})
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDropdown;

const DepartmentButton = ({ department, onClick }) => {
  return (
    <button
      className="p-4 border-2 border-gray-300 rounded-md text-black"
      onClick={() => onClick(department)}
    >
      {department.department_name}
    </button>
  );
};

export default DepartmentButton;

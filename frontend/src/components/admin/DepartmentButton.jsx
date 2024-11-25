const DepartmentButton = ({ department, onClick }) => {
  return (
    <button
      className="p-4 border-2 border-gray-300 rounded-md"
      onClick={() => onClick(department)}
    >
      {department.name}
    </button>
  );
};

export default DepartmentButton;

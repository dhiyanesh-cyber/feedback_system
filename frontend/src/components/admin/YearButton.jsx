const YearButton = ({ year, onClick }) => {
    return (
      <button
        className="p-4 border-2 border-gray-300 rounded-md"
        onClick={() => onClick(year)}
      >
        {year}
      </button>
    );
  };
  
  export default YearButton;
  
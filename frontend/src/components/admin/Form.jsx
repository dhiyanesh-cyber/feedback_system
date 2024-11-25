const Form = ({ staffId, setStaffId, subjectId, setSubjectId, onSubmit }) => {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block">Staff ID</label>
          <input
            type="text"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block">Subject ID</label>
          <input
            type="text"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </form>
    );
  };
  
  export default Form;
  
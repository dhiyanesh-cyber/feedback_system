import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFaculty } from '../../services/facultyApi';

const ReportPage = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch faculty details
  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const data = await getAllFaculty();
        setFacultyData(data);
        setFilteredFaculty(data);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFacultyDetails();
  }, []);

  // Handle search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = facultyData.filter((faculty) =>
      faculty.faculty_name.toLowerCase().includes(query) || 
      faculty.code.toString().includes(query)
    );
    setFilteredFaculty(filtered);
  };

  if (facultyData.length === 0) {
    return <div>Loading faculty details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Faculty Details</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or code"
          className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Faculty Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((faculty) => (
          <div
            key={faculty.code}
            className="border rounded-lg shadow-lg p-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/admin/report/${faculty.code}`)}
          >
            <h2 className="text-lg font-semibold">{faculty.faculty_name}</h2>
            <p className="text-gray-600">Code: {faculty.code}</p>
          </div>
        ))}
      </div>

      {/* No Results Found */}
      {filteredFaculty.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No results found.</p>
      )}
    </div>
  );
};

export default ReportPage;

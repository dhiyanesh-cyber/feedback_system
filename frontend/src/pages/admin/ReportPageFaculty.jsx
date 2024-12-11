import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReportData } from '../../services/reportApi';

const ReportPageFaculty = () => {
  const [reportData, setReportData] = useState(null); // State to store the report data
  const maxPerformanceScore = 24; // Maximum score for total performance
  const { faculty_id } = useParams();

  useEffect(() => {
    // Fetch data from the API
    const fetchReportData = async () => {
      try {
        const data = await getReportData(faculty_id);
        setReportData(data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, []);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Faculty Performance Report</h1>

  {/* Subject Performance Section */}
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-center md:text-left">Subject Performance</h2>
    <div className="overflow-x-auto mt-2">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Form ID</th>
            <th className="border border-gray-200 px-4 py-2">Subject ID</th>
            <th className="border border-gray-200 px-4 py-2">Department</th>
            <th className="border border-gray-200 px-4 py-2">Year</th>
            <th className="border border-gray-200 px-4 py-2">Class</th>
            <th className="border border-gray-200 px-4 py-2">Response</th>
          </tr>
        </thead>
        <tbody>
          {reportData.subject_performance.map((subject, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2 text-center">{subject.form_id}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">{subject.subject_id}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">{subject.department_id}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">{subject.year}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">{subject.class}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                {subject.average_response.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Total Performance Section */}
  <div className="mt-4">
    <h2 className="text-xl font-semibold text-center md:text-left">Total Performance</h2>
    <p className="mt-2 text-lg text-center md:text-left">
      Total Performance Score:{" "}
      <span className="font-bold">
        {(reportData.total_performance / maxPerformanceScore * 24).toFixed(2)} / {maxPerformanceScore}
      </span>
    </p>
  </div>
</div>

  );
};

export default ReportPageFaculty;

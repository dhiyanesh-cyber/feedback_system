import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { getReportData } from '../../services/reportApi';
import pieChartData from './pieChartData.json'; // Import your JSON data

// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const ReportPageFaculty = () => {
  const [reportData, setReportData] = useState(null);
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
  }, [faculty_id]);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  const generatePieChartData = (subject) => {
    const responses = subject.responses;
    return {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          data: responses,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverBackgroundColor: ['#FF6F91', '#4BA3F9', '#FFDB69', '#52C9C9', '#9A6EFF'],
        },
      ],
    };
  };

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

      {/* Pie Chart Section for each Subject */}
      <div className="mt-6 flex-row flex space-x-28">
        {pieChartData.subjects.map((subject, index) => (
          <div key={index} className="mb-6 w-64">
            <h3 className="text-lg font-semibold text-center">{subject.subject_name} Performance</h3>
            <Pie
              data={generatePieChartData(subject)}
              options={{
                responsive: true,
                maintainAspectRatio: true, // Ensures the aspect ratio is maintained
                plugins: {
                  tooltip: {
                    enabled: false, // Disable tooltips to remove the red labels
                  },
                  legend: {
                    display: true, // Optional: Hide the legend if not needed
                  },
                },
                aspectRatio: 1, // Decrease aspect ratio to make it smaller
              }}
            />

          </div>
        ))}
      </div>

      {/* Total Performance Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-center md:text-left">Total Performance</h2>
        <p className="mt-2 text-lg text-center md:text-left">
          Total Performance Score:{" "}
          <span className="font-bold">
            {(reportData.total_performance / 24 * 24).toFixed(2)} / 24
          </span>
        </p>
      </div>
    </div>
  );
};

export default ReportPageFaculty;

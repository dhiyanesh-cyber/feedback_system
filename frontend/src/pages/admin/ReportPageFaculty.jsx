import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { getReportData } from '../../services/reportApi';

// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import Navbar from '../../components/Nabvbar';
import { fetchFacultyDetails } from '../../services/facultyApi';

// Register the components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const ReportPageFaculty = () => {
  const [reportData, setReportData] = useState(null);
  const [facultyName, setFacultyName] = useState('');
  const { faculty_id } = useParams();

  useEffect(() => {
    // Fetch data from the API
    const fetchReportData = async () => {
      try {
        const data = await getReportData(faculty_id);
        console.log(data);
        const faculty = await fetchFacultyDetails(faculty_id);
        console.log(faculty[0].faculty_name);

        setFacultyName(faculty[0].faculty_name);
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
      labels: ["Poor", "Not bad", "Average", "Good", "Excellent"],
      datasets: [
        {
          data: responses,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverBackgroundColor: ['#FF6F91', '#4BA3F9', '#FFDB69', '#52C9C9', '#9A6EFF'],
        },
      ],
    };
  };

  // Function to convert responses to bar chart data format
  const getChartData = (responses) => {

    const categories = ["poor", "notbad", "average", "good", "excellent"]; // Ratings from 1 to 5
    return {
      labels: categories,
      datasets: [
        {
          data: responses,
          backgroundColor: [
            "#FF4B4B",
            "#FFA500",
            "#FFD700",
            "#4CAF50",
            "#36A2EB",
          ],
        },
      ],
    };
  };

  return (

    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Faculty Performance Report</h1>
        <h2 className="text-xl font-semibold text-center md:text-left">Faculty: {facultyName}</h2>
        {/* Subject Performance Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center md:text-left">Subject Performance</h2>
          <div className="overflow-x-auto mt-2">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2">Subject Name</th>
                  <th className="border border-gray-200 px-4 py-2">Department</th>
                  <th className="border border-gray-200 px-4 py-2">Year</th>
                  <th className="border border-gray-200 px-4 py-2">Class</th>
                  <th className="border border-gray-200 px-4 py-2">Response</th>
                  <th className="border border-gray-200 px-4 py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {reportData.subject_performance.map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-center">{subject.subjectName}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{subject.departmentName.slice(3)}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{subject.year}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{subject.class}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{subject.studentCount + "/" + subject.maxCount}</td>
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
              {(reportData.total_performance).toFixed(2)} / 25
            </span>
          </p>
        </div>
        {/* Pie Chart Section for each Subject */}
        <div className="mt-6 flex-row flex space-x-28">
          {reportData.subject_performance.map((subject, index) => {
            if (subject.studentCount > 0) {
              return (
                <div key={index} className="mb-6 w-80">
                  <h3 className="text-lg font-semibold text-center">{subject.subjectName} Performance</h3>
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
              )
            }

          })}
        </div>
        {/* Render the Bar Charts in a Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {reportData.questionPerformance.map((questionData, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-center">
                {questionData.question}
              </h3>
              <div className="mt-4" style={{ maxWidth: "350px" }}>
                <Bar
                  data={getChartData(questionData.responses)}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        enabled: false, // Disable tooltips to remove the red labels
                      },
                      legend: {
                        display: false, // Optional: Hide the legend if not needed
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          display: true, // You can set this to false if you don't want axis labels at all
                        },
                      },
                      y: {
                        ticks: {
                          display: true, // You can set this to false if you don't want axis labels at all
                        },
                      },
                    },
                    aspectRatio: 1.5,
                  }}
                  height={200} // Control the height of the chart
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default ReportPageFaculty;

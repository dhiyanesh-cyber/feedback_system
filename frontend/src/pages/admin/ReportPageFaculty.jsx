import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import questionResponses from "./questionResponses.json"; // Import JSON file
import Navbar from "../../components/Nabvbar";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportPageFaculty = () => {
  const [reportData, setReportData] = useState(null); // State to store the report data
  const maxPerformanceScore = 24; // Maximum score for total performance

  // Simulating the fetch of reportData (mocked data for now)
  useEffect(() => {
    const mockReportData = {
      subject_performance: [
        {
          form_id: 1,
          faculty_id: 1100016,
          subject_id: "AD3281",
          department_id: "BE_CSE",
          year: 4,
          class: 1,
          average_response: 82,
        },
        {
          form_id: 2,
          faculty_id: 1100016,
          subject_id: "AD3281",
          department_id: "BE_ECE",
          year: 4,
          class: 1,
          average_response: 0,
        },
      ],
      total_performance: 41,
    };
    setReportData(mockReportData);
  }, []);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  // Function to convert responses to chart data format
  const getChartData = (question, responses) => {
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
      <div className="container pt-16 mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Faculty Performance Report
        </h1>
        {/* Subject Performance Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center md:text-left">
            Subject Performance
          </h2>
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
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {subject.form_id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {subject.subject_id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {subject.department_id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {subject.year}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {subject.class}
                    </td>
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
          <h2 className="text-xl font-semibold text-center md:text-left">
            Total Performance
          </h2>
          <p className="mt-2 text-lg text-center md:text-left">
            Total Performance Score:{" "}
            <span className="font-bold">
              {(
                (reportData.total_performance / maxPerformanceScore) *
                24
              ).toFixed(2)}{" "}
              / {maxPerformanceScore}
            </span>
          </p>
        </div>
        {/* Render the Bar Charts in a Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {questionResponses.map((questionData, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-center">
                {questionData.question}
              </h3>
              <div className="mt-4" style={{ maxWidth: "350px" }}>
                <Bar
                  data={getChartData(
                    questionData.question,
                    questionData.responses
                  )}
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

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Nabvbar";
import Toggle from "./Toggle";
import { updateYearStatus, fetchYearStatus } from "../../services/classApi";

const YearSelection = () => {
  const navigate = useNavigate();
  const { department_id } = useParams();
  const [toggleStates, setToggleStates] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const years = [
    { id: 2, name: "2nd Year" },
    { id: 3, name: "3rd Year" },
    { id: 4, name: "4th Year" },
  ];

  // Fetch initial toggle states
  useEffect(() => {
    const fetchAllYearStatuses = async () => {
      try {
        const initialStates = {};

        // Fetch status for each year
        for (const year of years) {
          const yearData = await fetchYearStatus(department_id, year.id);
          // If we get data for this year, set its status
          if (yearData && yearData.length > 0) {
            initialStates[year.id] = yearData[0].live_status === 1;
          }
        }

        setToggleStates(initialStates);
      } catch (error) {
        console.error("Error fetching year statuses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllYearStatuses();
  }, [department_id]);

  const handleYearClick = (yearId) => {
    navigate(`/admin/departments/${department_id}/${yearId}/`);
  };

  const handleToggle = async (yearId) => {
    try {
      setToggleStates(prev => ({
        ...prev,
        [yearId]: !prev[yearId]
      }));

      await updateYearStatus(
        department_id,
        yearId,
        !toggleStates[yearId]
      );
    } catch (error) {
      console.error("Error updating year status:", error);
      // Revert the toggle if the API call failed
      setToggleStates(prev => ({
        ...prev,
        [yearId]: !prev[yearId]
      }));
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start pt-32 min-h-screen bg-gray-50">
        <div className="w-full max-w-lg bg-white rounded-lg border-2 border-gray-300x p-8">
          <h2 className="text-xl font-normal text-center text-black opacity-90 mb-6">
            Select Year
          </h2>
          <ul className="space-y-4 flex flex-col">
            {years.map((year) => (
              <div key={year.id} className="flex space-x-4 justify-center items-center">
                <li
                  onClick={() => handleYearClick(year.id)}
                  className="p-4 bg-white border-2 border-gray-300x rounded-lg text-white-500 text-center cursor-pointer hover:text-white hover:bg-customGray transition duration-200 ease-in-out transform w-60 place-self-center"
                >
                  <span className="text-lg font-normal">{year.name}</span>
                </li>
                <Toggle
                  checked={toggleStates[year.id] || false}
                  onChange={() => handleToggle(year.id)}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default YearSelection;
import React, { useEffect, useState } from "react";
import { fetchAllQuestions } from "../services/questionApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { postStudentResponse } from "../services/responseSubmissionApi";
import Navbar from "../components/Nabvbar";

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([]);
  const { form_id, student_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { facultyDetails, subjectDetails } = location.state;

  // Options for each question
  const options = ['Poor', 'Not Bad', 'Average', 'Good', 'Excellent'];
  //value for each options
  const values = [1, 2, 3, 4, 5];


  useEffect(() => {
    const fetchQuestionsData = async () => {
      const questionsData = await fetchAllQuestions();
      setQuestions(questionsData);
    };

    console.log(facultyDetails);


    fetchQuestionsData();
  }, []);

  const totalQuestions = questions.length;

  const handleNext = () => {
    if (!response[currentQuestionIndex]) {
      alert(
        currentQuestionIndex === totalQuestions - 1
          ? "Choose an option to submit your response."
          : "Choose an option to answer the next question."
      );
      return;
    }

    if (currentQuestionIndex === totalQuestions - 1) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const submitResponse = response.map((element, index) => ({
      response: element,
      form_id,
      student_id,
      question_id: index + 1,
    }));
    console.log(submitResponse);
    try {
      await postStudentResponse(submitResponse);
    } catch (error) {
      console.log(error);

    }

    navigate("/student-panel");
  };

  const handleOptionSelect = (index) => {
    setResponse((prev) => {
      const updatedResponse = [...prev];
      updatedResponse[currentQuestionIndex] = values[index];
      return updatedResponse;
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col  items-center justify-start py-32 px-4 min-h-screen bg-gray-100">
        <div className="w-full flex flex-col items-center justify-center space-y-10 ">
          <div className=" flex flex-col justify-start align-start w-full max-w-4xl">
            <p className="font-semibold text-lg">{facultyDetails.faculty_name} ({subjectDetails.sub_name})</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl h-auto min-h-[300px]">
            {/* Progress Bar */}
            <div className="text-center font-medium text-gray-700 mb-4">
              <p>
                {currentQuestionIndex + 1}/{totalQuestions}
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden my-2">
                <div
                  className="h-full bg-black"
                  style={{
                    width: `${((currentQuestionIndex + 1) / totalQuestions) * 100
                      }%`,
                  }}
                ></div>
              </div>
            </div>
            {/* Question Text */}
            <div className="text-center text-gray-800 font-semibold mb-6">
              {questions.length > 0 &&
                questions[currentQuestionIndex]?.question_text}
            </div>
            {/* Options */}
            <div className="space-y-3 sm:space-x-4 flex flex-col sm:flex-row justify-evenly">
              {options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    className="form-radio text-black"
                    onChange={() => handleOptionSelect(index)}
                    checked={response[currentQuestionIndex] - 1 === index}
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                className={`px-4 py-2 bg-white text-gray-700 border rounded-md hover:bg-gray-100 ${currentQuestionIndex === 0 && "opacity-50 cursor-not-allowed"
                  }`}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                {currentQuestionIndex === totalQuestions - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionnaire;

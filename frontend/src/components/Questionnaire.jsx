import React, { useState } from "react";

const Questionnaire = () => {
  // State to track the current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Example questions array
  const questions = [
    "You need to know code to be a web designer",
    "Do you have prior experience in web development?",
    "Are you interested in frontend, backend, or full-stack development?",
    "Do you prefer working on individual projects or as part of a team?",
    "What is your preferred programming language?",
    // Add more questions up to 24
  ];

  // Options for each question (can be customized per question if needed)
  const options = [
    "New project",
    "Existing project",
    "Ongoing assistance or consultation",
    "None of the above",
  ];

  // Total number of questions
  const totalQuestions = questions.length;

  // Function to handle going to the next question
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Function to handle going to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-center text-gray-800 font-semibold mb-6">
          {questions[currentQuestionIndex]}
        </div>

        {/* Options */}
        <div className="space-y-4">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                className="form-radio text-black"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            className={`px-4 py-2 bg-white text-gray-700 border rounded-md hover:bg-gray-100 ${
              currentQuestionIndex === 0 && "opacity-50 cursor-not-allowed"
            }`}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 ${
              currentQuestionIndex === totalQuestions - 1 &&
              "opacity-50 cursor-not-allowed"
            }`}
            disabled={currentQuestionIndex === totalQuestions - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;

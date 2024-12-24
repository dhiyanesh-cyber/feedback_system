import React, { useEffect, useState } from "react";
import { fetchAllQuestions } from "../services/questionApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { postStudentResponse } from "../services/responseSubmissionApi";
import Navbar from "../components/Nabvbar";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, useDisclosure } from "@nextui-org/react";
import CustomModal from "./customModal";



const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      onOpen();

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
      <Navbar isLogin={false} />
      <div className="h-[40rem] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-start pt-6 sm:pt-32 justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col w-full px-6 items-center justify-start sm:py-0  sm:px-0">
          <div className="w-full sm:w-1/2 flex flex-col items-center justify-center space-y-5 ">
            <Card className="w-full ">
              <CardHeader className="flex gap-3">

                <div className="flex flex-col">
                  <p className="text-md ">{facultyDetails.faculty_name}</p>
                  <p className="text-small text-default-500">{subjectDetails.sub_name}</p>
                </div>
              </CardHeader>
            </Card>

            {/* Question Card */}
            <Card className="w-full ">
              <CardHeader className="flex flex-col gap-3">
                {/* Progress information */}
                <div className="w-full text-center text-md text-gray-700">
                  <p>
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden my-2">
                    <div
                      className="h-full bg-black transition-all ease-soft-spring duration-300"
                      style={{
                        width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                {/* Question Text */}
                <div className="text-center text-gray-800 font-semibold mb-3">
                  {questions.length > 0 && questions[currentQuestionIndex]?.question_text}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 w-full">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={`rounded-lg p-3 cursor-pointer transition-all ${response[currentQuestionIndex] - 1 === index
                        ? 'border-1 shadow-inner  border-gray-400' // Thicker border when selected
                        : 'border hover:border-gray-400' // Normal border with hover effect
                        }`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <label className="flex items-center justify-start w-full cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          className={`form-radio w-4 h-4 focus:ring-0  accent-black`}
                          onChange={() => handleOptionSelect(index)}
                          checked={response[currentQuestionIndex] - 1 === index}
                        />
                        <span className={` ml-3  ${response[currentQuestionIndex] - 1 === index ? 'text-gray-700' : 'text-gray-700'} text-gray-700`} >
                          {option}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

              </CardBody>
              {/* <Divider /> */}
              <CardFooter className="flex justify-between">
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
              </CardFooter>
            </Card>

          </div>
        </div>
        <CustomModal radius="none" placement="center" isOpen={isOpen} onClose={onClose} backdrop="blur" isLast={currentQuestionIndex === totalQuestions - 1} />
      </div>
    </>
  );
};

export default Questionnaire;

import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../lib/context/user";
import { Loading } from "./Loading";
import { useDailyQuestions } from "../hooks/customHooks";

export function Quiz() {
  const { isLoading, completeQuestions, setStarted, setFinished } = useUser();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answerSelected, setAnswerSelected] = useState(false);
  const [answer, setAnswer] = useState("");
  const [inputError, setInputError] = useState(false);

  useDailyQuestions(setQuestions);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentAnswer !== "") {
      setAnswerSelected(true);
      setAnswer(currentAnswer);
      if (event.target.value === currentQuestion.correctAnswer) {
        setCorrect(correct + 1);
      }
    } else {
      setInputError(true);
    }
  };

  const handleNextQuestion = (event) => {
    event.preventDefault();
    setAnswerSelected(false);
    setCurrentAnswer("");
    setInputError(false);
    if (currentQuestionIndex < 2) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuestions("280");
      setStarted(false);
      setFinished(true);
    }
  };

  const handleOptionChange = (event) => {
    setCurrentAnswer(event.target.value);
    setInputError(false);
  };

  //Timer
  const [totalSeconds, setTotalSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="w-full h-[calc(100vh-7rem)] bg-primary absolute top-20 flex justify-center items-start md:items-center">
      {isLoading ? (
        <Loading />
      ) : (
        <form
          className={`inline-flex flex-col md:flex-row items-center md:justify-center px-2 md:px-6 md:py-4 relative md:bg-white rounded-3xl${
            answerSelected && answer === currentQuestion?.correctAnswer
              ? "md:border-green-500 md:border-solid md:border-4"
              : ""
          }`}
        >
          {/* Image Area */}
          <div className="inline-flex flex-row h-[50vh] md:h-auto md:w-auto items-center justify-center px-1 py-2 md:bg-white rounded-lg relative flex-[0_0_auto]">
            <img
              className={`relative max-w-full max-h-[78vh] h-auto w-auto object-contain md:max-w-3xl lg:max-w-5xl rounded-lg ${
                answerSelected && answer === currentQuestion?.correctAnswer
                  ? "border-green-500 border-solid border-4 md:border-0"
                  : ""
              }`}
              alt={`Question ${currentQuestionIndex + 1}`}
              draggable={false}
              src={currentQuestion?.image}
            />
          </div>
          {/* Button Area */}
          <div className="inline-flex flex-col h-[30vh] md:h-auto md:w-auto items-center gap-8 relative flex-[0_0_auto]">
            {/* Option Buttons */}
            <div className="inline-flex flex-col items-center justify-center relative flex-[0_0_auto]">
              <ul className="grid md:grid-cols-1 grid-cols-2 gap-4 w-full pt-4">
                {["A", "B", "C", "D"].map((option) => (
                  <li key={option}>
                    <input
                      type="radio"
                      id={`option${option}`}
                      name="options"
                      value={option}
                      className="hidden peer"
                      onChange={handleOptionChange}
                      checked={currentAnswer === option}
                      disabled={answerSelected}
                      required
                    />
                    <label
                      htmlFor={`option${option}`}
                      className={`inline-flex items-center justify-between w-full p-5 px-10 text-gray-500 bg-white border-2 border-gray-200 rounded-xl cursor-pointer 
    hover:text-gray-600 hover:bg-gray-100
    ${
      answerSelected && option === currentQuestion.correctAnswer
        ? "bg-green-300 border-green-500 text-green-500"
        : answerSelected &&
          currentAnswer === option &&
          currentAnswer !== currentQuestion.correctAnswer
        ? "bg-red-300 border-red-500 text-red-500"
        : "peer-checked:border-lightBlue peer-checked:text-lightBlue"
    }
    ${
      answerSelected &&
      option === currentQuestion.correctAnswer &&
      "peer-checked:border-green-500 peer-checked:text-green-500 peer-checked:bg-green-300"
    }
    ${
      answerSelected &&
      currentAnswer === option &&
      currentAnswer !== currentQuestion.correctAnswer &&
      "peer-checked:border-red-500 peer-checked:text-red-500 peer-checked:bg-red-300"
    }
  `}
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          {option}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {/* Submit Buttons */}
            {answerSelected ? (
              <button
                onClick={handleNextQuestion}
                hidden={!answerSelected}
                type="button"
                className="text-white bg-lightBlue hover:bg-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                hidden={answerSelected}
                className={`${
                  currentAnswer === ""
                    ? "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5"
                    : "text-white bg-lightBlue hover:bg-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                }`}
              >
                Submit
              </button>
            )}
            <p className={`text-red-600 text-sm ${inputError ? "" : "hidden"}`}>
              Please select an answer.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

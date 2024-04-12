import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quiz.scss";
import asEconomicsQuestions from "../../data/asEconomicsQuestions.json";
import { motion } from "framer-motion";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const currentQuestion = asEconomicsQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < asEconomicsQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz ended, handle accordingly
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex - 1 >= 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Cannot go back
    }
  };

  const handleQuestionAnswered = ({ target }) => {
    // When correct answer selected:
    if (target.value === currentQuestion.correctOption) {
      setCorrect(correct + 1);
      if (currentQuestionIndex + 1 < asEconomicsQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        navigate("/results");
      }
    } else {
      // When incorrect answer selected:
      setIncorrect(incorrect + 1);
      if (currentQuestionIndex + 1 < asEconomicsQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        navigate("/results");
      }
    }
  };

  return (
    <div className="quiz">
      <div className="header">
        <h1>AQA AS Economics MCQs</h1>
        <p>Score {correct}</p>
        <p>Incorrect: {incorrect}</p>
      </div>
      <div className="questionArea">
        <img
          src={currentQuestion.image}
          alt={`Question ${currentQuestion.question}`}
          draggable={false}
        />
        <div className="answerBtns">
          {currentQuestion.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <button
                name={`question${currentQuestion.question}`}
                onClick={handleQuestionAnswered}
                value={option}
              >
                {option}
              </button>
            </label>
          ))}
        </div>
        <div className="changeQuestionBtns">
          <button onClick={handlePreviousQuestion}>Previous Question</button>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

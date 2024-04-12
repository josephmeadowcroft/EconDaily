import React from "react";
import { useState } from "react";
import "./quiz.scss";
import asEconomicsQuestions from "../data/asEconomicsQuestions.json";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

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
    if (target.value === currentQuestion.correctOption) {
      setScore(score + 1);
      if (currentQuestionIndex + 1 < asEconomicsQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Handle end of quiz
      }
    }
  };

  return (
    <div className="quiz">
      <div className="header">
        <h1>AQA AS Economics MCQs</h1>
        <p>Score: {score}</p>
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

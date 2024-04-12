import React from "react";
import { useState } from "react";
import "./quiz.scss";
import asEconomicsQuestions from "../data/asEconomicsQuestions.json";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = asEconomicsQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < asEconomicsQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz ended, handle accordingly
    }
  };

  return (
    <div className="quiz">
      <h1>AQA AS Economics MCQs</h1>
      <h2>Question {currentQuestion.question}</h2>
      <img
        src={currentQuestion.image}
        alt={`Question ${currentQuestion.question}`}
      />
      <div>
        {currentQuestion.options.map((option, optionIndex) => (
          <label key={optionIndex}>
            <input
              type="radio"
              name={`question${currentQuestion.question}`}
              value={option}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
};

export default Quiz;

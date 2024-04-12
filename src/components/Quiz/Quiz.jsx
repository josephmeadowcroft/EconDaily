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
  const [answerSelected, setAnswerSelected] = useState(false);
  const [answer, setAnswer] = useState("");

  const currentQuestion = asEconomicsQuestions[currentQuestionIndex];

  const handleQuestionAnswered = ({ target }) => {
    setAnswerSelected(true);
    setAnswer(target.value);
    // When correct answer selected:
    if (target.value === currentQuestion.correctOption) {
      setCorrect(correct + 1);
    } else {
      // When incorrect answer selected:
      setIncorrect(incorrect + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < asEconomicsQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSelected(false);
    } else {
      navigate("/results", { state: { correct } });
    }
  };

  return (
    <div className="quiz">
      <div className="header">
        <h1>AQA AS Economics MCQs</h1>
        <p>Score: {correct}</p>
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
              <motion.button
                className={`${
                  option === currentQuestion.correctOption
                    ? "correctAnswerBtn"
                    : "incorrectAnswerBtns"
                } ${answerSelected ? "answered" : ""} ${
                  answer === option
                    ? "correctAnswerSelected"
                    : "incorrectAnswerSelected"
                }`}
                name={`question${currentQuestion.question}`}
                onClick={handleQuestionAnswered}
                value={option}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={answerSelected}
              >
                {option}
              </motion.button>
            </label>
          ))}
          <button
            id="nextQuestionBtn"
            hidden={!answerSelected}
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

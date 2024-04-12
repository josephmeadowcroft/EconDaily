import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./quiz.scss";
import asEconomicsQuestionsP2 from "../../data/asEconomicsQuestionsP2.json";
import { motion } from "framer-motion";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [answer, setAnswer] = useState("");
  const [attempted, setAttempted] = useState(0);

  const currentQuestion = asEconomicsQuestionsP2[currentQuestionIndex];

  const handleQuestionAnswered = ({ target }) => {
    setAnswerSelected(true);
    setAnswer(target.value);
    setAttempted(attempted + 1);
    // When correct answer selected:
    if (target.value === currentQuestion.correctOption) {
      setCorrect(correct + 1);
    } else {
      // When incorrect answer selected:
      setIncorrect(incorrect + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < asEconomicsQuestionsP2.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSelected(false);
    } else {
      navigate("/results", { state: { correct, attempted } });
    }
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
    <div className="quiz">
      <div className="header">
        <h1>AQA AS Economics MCQs</h1>
        <div className="questionInfo">
          <p>
            Timer:{" "}
            {`${minutes < 10 ? "0" : ""}${minutes}:${
              seconds < 10 ? "0" : ""
            }${seconds}`}
          </p>
          <p>
            Answered: {attempted}/{asEconomicsQuestionsP2.length}
          </p>
        </div>
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

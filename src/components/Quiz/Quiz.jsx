import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./quiz.scss";
import asEconomicsQuestionsP2 from "../../data/asEconomicsQuestionsP2.json";
import { motion } from "framer-motion";

import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/themes/lara-light-teal/theme.css";

const Quiz = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const questionsValue = state?.questionsValue;
  const checkboxValues = state?.checkboxValues;
  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [answer, setAnswer] = useState("");
  const [attempted, setAttempted] = useState(0);

  useEffect(() => {
    
  }, [])

  const currentQuestion = asEconomicsQuestionsP2[currentQuestionIndex]; // change to questions

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
    if (currentQuestionIndex + 1 < questionsValue) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSelected(false);
    } else {
      navigate("/results", { state: { correct, attempted, minutes, seconds } });
    }
  };

  const percentageComplete = Math.floor((attempted / questionsValue) * 100);

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

  // Shuffler
  useEffect(() => {
    const shuffledQuestions = shuffleArray(asEconomicsQuestionsP2); // change to questions
    setQuestions(shuffledQuestions);
  }, []);
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return (
    <div className="quiz">
      <div className="header">
        <h1>AQA AS Economics MCQs</h1>
        <div className="p-progressbar">
          <ProgressBar value={percentageComplete} displayValue={false} />
        </div>
        <div className="questionInfo">
          <p>
            Timer:{" "}
            {`${minutes < 10 ? "0" : ""}${minutes}:${
              seconds < 10 ? "0" : ""
            }${seconds}`}
          </p>
          <p>
            Answered: {attempted}/{questionsValue}
          </p>
        </div>
      </div>
      <div className="questionArea">
        <img
          src={currentQuestion.image}
          alt={`Question ${currentQuestion.question}`}
          draggable={false}
          style={{
            border: `${
              answerSelected && answer === currentQuestion.correctOption
                ? `3px solid rgb(0, 255, 0)`
                : `none`
            }`,
          }}
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
                whileHover={{ scale: answerSelected ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={answerSelected}
              >
                {option}
              </motion.button>
            </label>
          ))}
          <motion.button
            id="nextQuestionBtn"
            hidden={!answerSelected}
            onClick={handleNextQuestion}
            whileHover={{ scale: !answerSelected ? 1 : 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

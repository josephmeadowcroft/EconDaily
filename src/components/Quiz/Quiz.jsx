import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./quiz.scss";
import asEconomicsQuestions from "../../data/asEconomicsQuestions.json";
import { motion } from "framer-motion";

import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/themes/lara-light-blue/theme.css";

const Quiz = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const checkboxValues = state?.checkboxValues;

  let questionsValue = localStorage.getItem("questionsValue");
  if (questionsValue === null || questionsValue === undefined) {
    questionsValue = 20;
  }

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [answer, setAnswer] = useState("");
  const [attempted, setAttempted] = useState(0);

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

  // Question set logic
  useEffect(() => {
    let filteredQuestions;
    console.log(asEconomicsQuestions);
    if (checkboxValues?.paper1 && !checkboxValues?.paper2) {
      filteredQuestions = asEconomicsQuestions.filter(
        (question) => question.paper === 1
      );
      console.log(filteredQuestions);
    } else if (!checkboxValues?.paper1 && checkboxValues?.paper2) {
      filteredQuestions = asEconomicsQuestions.filter(
        (question) => question.paper === 2
      );
      console.log(filteredQuestions);
    } else {
      filteredQuestions = asEconomicsQuestions;
      console.log(filteredQuestions);
    }
    const shuffledQuestions = shuffleArray(filteredQuestions);
    setQuestions(shuffledQuestions);
  }, []);
  const currentQuestion = questions[currentQuestionIndex];

  // Shuffler
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
          <ProgressBar
            value={percentageComplete}
            displayValue={false}
            color="yellow-400"
          />
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
        <div className="imgContainer">
          <img
            src={currentQuestion?.image}
            alt={`Question ${currentQuestion?.question}`}
            draggable={false}
            style={{
              border: `${
                answerSelected && answer === currentQuestion?.correctOption
                  ? `3px solid rgb(0, 255, 0)`
                  : `none`
              }`,
            }}
          />
        </div>
        <div className="answerBtns">
          {currentQuestion?.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <motion.button
                className={`${
                  option === currentQuestion?.correctOption
                    ? "correctAnswerBtn"
                    : "incorrectAnswerBtns"
                } ${answerSelected ? "answered" : ""} ${
                  answer === option
                    ? "correctAnswerSelected"
                    : "incorrectAnswerSelected"
                }`}
                name={`question${currentQuestion?.question}`}
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

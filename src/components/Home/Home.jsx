import React from "react";
import "./home.scss";
import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      question: "What subject would you like to study?",
      options: [
        "Maths",
        "Chemistry",
        "Biology",
        "Physics",
        "Economics",
        "Psychology",
      ],
    },
    {
      question: "Choose your exam board:",
      options: ["AQA", "Edexcel", "OCR", "Other"],
    },
  ];

  const handleOptionClick = (option) => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Exam Question Generator</h1>
        <div className="creditsWrapper">
          <p>by Joseph Meadowcroft</p>
          <a href="https://github.com/josephmeadowcroft" target="_blank">
            <img src="src/assets/github.png" alt="github" />
          </a>
        </div>
      </div>
      <div className="quizSelectionForm">
        {currentQuestionIndex < questions.length && (
          <motion.div
            className="question"
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
              },
            }}
          >
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div className="optionBtns">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <motion.button
                  key={index}
                  className="optionBtn"
                  onClick={() => handleOptionClick(option)}
                  label={option}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;

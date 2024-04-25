import React, { useState, useEffect } from "react";
import "./home.scss";
import asEconomicsQuestions from "../../data/asEconomicsQuestions.json";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";

const Home = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [questionsValue, setQuestionsValue] = useState(20);
  const [checkboxValues, setCheckboxValues] = useState({
    paper1: false,
    paper2: false,
  });
  const [checkboxError, setCheckboxError] = useState(false);
  const [sliderError, setSliderError] = useState(false);
  const [maxValue, setMaxValue] = useState(20);

  // Max questions setter
  useEffect(() => {
    let p1Count = 0;
    let p2Count = 0;
    for (const obj of asEconomicsQuestions) {
      if (obj.paper === 1) {
        p1Count++;
      }
      if (obj.paper === 2) {
        p2Count++;
      }
    }
    if (checkboxValues.paper1 && !checkboxValues.paper2) {
      setMaxValue(p1Count);
    } else if (!checkboxValues.paper1 && checkboxValues.paper2) {
      setMaxValue(p2Count);
    } else if (checkboxValues.paper1 && checkboxValues.paper2) {
      setMaxValue(asEconomicsQuestions.length);
    }
  }, [checkboxValues]);

  const questions = [
    {
      question: "What subject would you like to study?",
      options: ["Economics"],
    },
    {
      question: "Choose your exam board:",
      options: ["AQA"],
    },
    {
      question: "Settings",
    },
  ];

  const handleOptionClick = (option) => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues({
      ...checkboxValues,
      [name]: checked,
    });
  };

  const handleSubmit = () => {
    if (checkboxValues.paper1 || checkboxValues.paper2) {
      if (questionsValue <= maxValue) {
        navigate("/quiz", { state: { checkboxValues } });
      } else {
        setSliderError(true);
      }
    } else {
      setCheckboxError(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("questionsValue", questionsValue);
  }, [questionsValue]);

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
        {/* Subject + Exam board */}
        {currentQuestionIndex < 2 && (
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1, opacity: 0.8 }}
                  value={option}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        {/* Settings */}
        {currentQuestionIndex < questions.length &&
          currentQuestionIndex >= 2 && (
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
              <div className="questionInputs">
                <div className="sliderContainer">
                  <p>Questions:</p>
                  <h3>{questionsValue}</h3>
                  <Slider
                    defaultValue={20}
                    w="200px"
                    min={1}
                    max={maxValue}
                    onChange={(val) => setQuestionsValue(val)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack bgGradient="linear-gradient(200deg, rgb(0, 229, 255) 0%, rgb(0, 123, 255) 100%);" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </div>
                <div className="paperContainer">
                  <p>From:</p>
                  <Checkbox
                    className="checkbox"
                    name="paper1"
                    size="lg"
                    onChange={handleCheckbox}
                  >
                    Paper 1
                  </Checkbox>
                  <Checkbox
                    className="checkbox"
                    name="paper2"
                    size="lg"
                    onChange={handleCheckbox}
                  >
                    Paper 2
                  </Checkbox>
                </div>
                <p className="checkboxError" hidden={!checkboxError}>
                  Please select at least one paper.
                </p>
                <p className="sliderError" hidden={!sliderError}>
                  Please adjust the number of questions.
                </p>
                <motion.button
                  className="startBtn"
                  onClick={() => handleSubmit()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                >
                  Start
                </motion.button>
              </div>
            </motion.div>
          )}
      </div>
    </div>
  );
};

export default Home;

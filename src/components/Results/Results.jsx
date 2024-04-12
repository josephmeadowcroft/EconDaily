import React from "react";
import "./results.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { color, motion } from "framer-motion";

const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const correct = state?.correct;
  const attempted = state?.attempted;

  const percentageCorrect = (correct / attempted) * 100;
  const percentageIncorrect = 100 - percentageCorrect;

  return (
    <div className="results">
      <h1>Results</h1>
      <p>
        Score: {correct}/{attempted}
      </p>
      <div className="scoreBarWrapper">
        <div
          className="scoreBarCorrect"
          style={{ width: percentageCorrect + "%" }}
        >
          <p>{percentageCorrect > 0 ? `${percentageCorrect}%` : ""}</p>
        </div>
      </div>
      <motion.button
        onClick={() => navigate("/quiz")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Try again
      </motion.button>
    </div>
  );
};

export default Results;

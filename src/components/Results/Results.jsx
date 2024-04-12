import React from "react";
import "./results.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { color, motion } from "framer-motion";

const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const correct = state?.correct;
  const attempted = state?.attempted;

  const percentageCorrect = Math.round((correct / attempted) * 100);

  return (
    <motion.div
      className="results"
      initial={{ opacity: 0, x: -500 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 1 },
      }}
    >
      <h1>Results</h1>
      <div className="resultsArea">
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
      </div>
      <motion.button
        onClick={() => navigate("/quiz")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Try again
      </motion.button>
    </motion.div>
  );
};

export default Results;

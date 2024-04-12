import React from "react";
import "./results.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const correct = state?.correct;

  return (
    <div className="results">
      <h1>Results</h1>
      <p>Score: {correct}</p>
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

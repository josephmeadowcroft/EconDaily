import React from "react";
import "./results.scss";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  return (
    <div className="results">
      <div className="allResults">
        <h2>Results:</h2>
        <button onClick={() => navigate("/quiz")}>Try again</button>
      </div>
    </div>
  );
};

export default Results;

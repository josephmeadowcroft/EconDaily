import React, { useState, useEffect } from "react";

const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  return midnight - now;
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="text-center">
      <span className="text-7xl font-semibold">
        {String(hours).padStart(2, "0")}:
      </span>
      <span className="text-7xl font-semibold">
        {String(minutes).padStart(2, "0")}:
      </span>
      <span className="text-7xl font-semibold">
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default Countdown;

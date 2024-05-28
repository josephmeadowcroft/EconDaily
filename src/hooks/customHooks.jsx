import { useEffect } from "react";
import questions from "../lib/asEconomicsQuestions.json";

export function useDailyQuestions(setQuestions) {
  useEffect(() => {
    const selectDailyQuestions = () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 0);
      const diff = today - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      // Determine the starting index based on the day of the year
      const questionsPerDay = 3;
      const startIndex = (dayOfYear * questionsPerDay) % questions.length;

      // Get the questions for today
      const todaysQuestions = questions.slice(
        startIndex,
        startIndex + questionsPerDay
      );

      // If we reach the end of the questions array, wrap around to the start
      if (todaysQuestions.length < questionsPerDay) {
        const remainingQuestions = questions.slice(
          0,
          questionsPerDay - todaysQuestions.length
        );
        todaysQuestions.push(...remainingQuestions);
      }

      setQuestions(todaysQuestions);
    };

    selectDailyQuestions();
  }, [setQuestions]);
}

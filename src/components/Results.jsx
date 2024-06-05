import { useState, useEffect } from "react";
import { useUser } from "../lib/context/user";
import { Loading } from "./Loading";
import { useDailyQuestions } from "../hooks/customHooks";

export function Results() {
  const { isLoading, userAnswers } = useUser();

  return (
    <div className="w-full h-[calc(100vh-7rem)] bg-primary absolute top-20 flex justify-center items-start md:items-center">
      <div
        className={`h-20 w-20 border-2 border-solid border-gray-500 ${
          userAnswers[0] === 1 ? "bg-green-400" : "bg-red-600"
        }`}
      ></div>
      <div
        className={`h-20 w-20 border-2 border-solid border-gray-500 ${
          userAnswers[1] === 1 ? "bg-green-400" : "bg-red-600"
        }`}
      ></div>
      <div
        className={`h-20 w-20 border-2 border-solid border-gray-500 ${
          userAnswers[2] === 1 ? "bg-green-400" : "bg-red-600"
        }`}
      ></div>
    </div>
  );
}

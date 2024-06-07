import { useUser } from "../lib/context/user";
import { Loading } from "./Loading";
import Countdown from "./Countdown";

export function Results() {
  const { isLoading, userAnswers } = useUser();

  return (
    <div className="w-full h-[calc(100vh-7rem)] bg-primary absolute top-20 flex flex-col gap-8 justify-around items-center">
      <div className="flex flex-col justify-center align-middle">
        <Countdown />
        <p className="text-center py-2">...until new questions available</p>
      </div>
      <div className="flex flex-row gap-12 ">
        <div
          className={`h-10 w-20 md:w-24 border border-solid border-gray-600 rounded-3xl ${
            userAnswers[0] === 1 ? "bg-green-400" : "bg-red-600"
          }`}
        ></div>
        <div
          className={`h-10 w-20 md:w-24 border border-solid border-gray-600 rounded-3xl ${
            userAnswers[1] === 1 ? "bg-green-400" : "bg-red-600"
          }`}
        ></div>
        <div
          className={`h-10 w-20 md:w-24 border border-solid border-gray-600 rounded-3xl ${
            userAnswers[2] === 1 ? "bg-green-400" : "bg-red-600"
          }`}
        ></div>
      </div>
    </div>
  );
}

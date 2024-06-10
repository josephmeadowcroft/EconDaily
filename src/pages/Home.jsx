import { useUser } from "../lib/context/user";
import { Navigate } from "react-router-dom";
import { Quiz } from "../components/Quiz";
import { Start } from "../components/Start";
import { Results } from "../components/Results";

export function Home() {
  const user = useUser();
  const { started, hasCompletedQuiz } = useUser();

  if (!user.current) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-auto w-auto flex justify-center items-center bg-primary">
      {hasCompletedQuiz ? <Results /> : started ? <Quiz /> : <Start />}
    </div>
  );
}

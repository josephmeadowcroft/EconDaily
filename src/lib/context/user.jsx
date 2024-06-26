import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import {
  account,
  getCurrentUserEmail,
  getDocumentIdByEmail,
  getUserXp,
  updateDocument,
  checkQuizCompletion,
  updateQuizCompletion,
} from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dailyQuestions, setDailyQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [dailyXp, setDailyXp] = useState(0);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  // Login
  async function login(email, password) {
    setIsLoading(true);
    try {
      const loggedIn = await account.createEmailPasswordSession(
        email,
        password
      );
      setUser(loggedIn);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Logout
  async function logout() {
    setIsLoading(true);
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      if (error.code === 401) {
        console.error("User is already logged out:", error);
      } else {
        console.error("Logout failed:", error);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  // Register
  async function register(email, password) {
    setIsLoading(true);
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch Email
  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const email = await getCurrentUserEmail();
        setUserEmail(email);
      } catch (error) {
        console.log("Error fetching user email:", error);
      }
    }

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        const completed = await checkQuizCompletion();
        setHasCompletedQuiz(completed);
        console.log(completed);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setIsLoading(false);
    };

    getUserData();
  }, []);

  const handleCompletionUpdate = async () => {
    await updateQuizCompletion();
    setHasCompletedQuiz(true);
  };

  // Update XP Function
  async function completeQuestions(xp) {
    setIsLoading(true);
    try {
      if (!userEmail) {
        throw new Error("User is not logged in");
      }

      const documentId = await getDocumentIdByEmail(userEmail);
      if (!documentId) {
        throw new Error("Document ID not found");
      }

      const existingXp = await getUserXp();
      const newXp =
        existingXp !== null && existingXp !== undefined ? existingXp + xp : xp;

      if (existingXp === null || existingXp === undefined) {
        console.log("Existing XP not found, initializing to new XP value.");
      }

      await updateDocument(documentId, { xp: newXp });
      console.log(`XP updated to ${newXp}`);
      // await handleCompletionUpdate();
      await updateDocument(documentId, { latestXp: xp });
    } catch (error) {
      console.log("Error completing questions:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Initial function
  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        current: user,
        login,
        logout,
        register,
        isLoading,
        dailyQuestions,
        setDailyQuestions,
        started,
        setStarted,
        completeQuestions,
        userAnswers,
        setUserAnswers,
        dailyXp,
        setDailyXp,
        hasCompletedQuiz,
        setHasCompletedQuiz,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

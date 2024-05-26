import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUserEmail,
  getDocumentIdByEmail,
  updateDocument,
} from "../appwrite";
import { account } from "../appwrite";

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

  async function completeQuestions(xp) {
    try {
      if (!userEmail) {
        throw new Error("User is not logged in");
      }

      const documentId = await getDocumentIdByEmail(userEmail);
      if (!documentId) {
        throw new Error("Document ID not found");
      }

      await updateDocument(documentId, { xp });
    } catch (error) {
      console.log("Error completing questions:", error);
    }
  }

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

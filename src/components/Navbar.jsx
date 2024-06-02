import { useLocation } from "react-router-dom";
import { useUser } from "../lib/context/user";

export function Navbar() {
  const user = useUser();
  const { started } = useUser();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/") {
    return null;
  }

  return (
    <nav className="bg-darkGrey">
      {started ? (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <a href="/">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 27L10.8137 18.3561C9.72878 17.3352 9.72878 15.6648 10.8137 14.6439L20 6"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      ) : (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              EconDaily<span className="text-lightBlue">.</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => user.logout()}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

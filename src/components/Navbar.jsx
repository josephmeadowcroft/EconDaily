import { useLocation } from "react-router-dom";
import { useUser } from "../lib/context/user";
import { useEffect } from "react";

export function Navbar() {
  const user = useUser();
  const { started } = useUser();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/" || started) {
    return null;
  }

  return (
    <nav className="bg-darkGrey">
      {started ? null : (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-8">
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

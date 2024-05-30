import { useEffect, useState } from "react";
import { useUser } from "../lib/context/user";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export function Login() {
  const user = useUser();
  const { isLoading } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user.current) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-lightGrey">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[80vw] h-[80vh] flex justify-center items-center shadow-2xl rounded-3xl bg-darkGrey">
          <form className="max-w-md w-full p-8 flex flex-col justify-around items-center">
            <h1 className="text-4xl mb-20 text-secondary font-semibold">
              EconDaily<span className="text-lightBlue">.</span>
            </h1>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <label
                htmlFor="floating_email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <label
                htmlFor="floating_password"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              onClick={() => user.login(email, password)}
              className="text-white mt-6 bg-lightBlue hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;

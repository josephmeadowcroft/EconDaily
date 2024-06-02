import { useUser } from "../lib/context/user";

export function Start() {
  const { setStarted } = useUser();

  const handleClick = () => {
    setStarted(true);
  };

  return (
    <div className="w-full h-[calc(100vh-7rem)] flex flex-col justify-center items-center gap-8">
      <svg
        width="124"
        height="124"
        viewBox="0 0 124 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M111.91 53.94L106.847 75.5367C102.507 94.1883 93.93 101.732 77.81 100.182C75.2267 99.975 72.4367 99.51 69.44 98.7867L60.76 96.72C39.215 91.605 32.55 80.9617 37.6133 59.365L42.6767 37.7167C43.71 33.325 44.95 29.5017 46.5 26.35C52.545 13.8467 62.8267 10.4883 80.0833 14.57L88.7117 16.585C110.36 21.6483 116.973 32.3433 111.91 53.94Z"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M77.8101 100.182C74.6067 102.352 70.5767 104.16 65.6684 105.762L57.5051 108.448C36.9934 115.062 26.1951 109.533 19.5301 89.0217L12.9167 68.6133C6.30339 48.1017 11.7801 37.2517 32.2917 30.6383L40.4551 27.9517C42.5734 27.28 44.5884 26.7117 46.5001 26.35C44.9501 29.5017 43.7101 33.325 42.6767 37.7167L37.6134 59.365C32.5501 80.9617 39.2151 91.605 60.7601 96.72L69.4401 98.7867C72.4367 99.51 75.2267 99.975 77.8101 100.182Z"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M65.3066 44.0717L90.365 50.4267"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60.2433 64.0667L75.2266 67.89"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2 className="text-3xl font-semibold">Daily questions ready!</h2>
      <button
        type="button"
        onClick={handleClick}
        className="text-white bg-lightBlue hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-6 py-3.5 text-center me-2 mb-2 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
      >
        Start
      </button>
    </div>
  );
}

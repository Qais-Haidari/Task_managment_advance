import { Link, Redirect } from "react-router-dom";
export default function Example() {
  return (
    <div className="bg-green-600">
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <div class="text-sm lg:flex-grow">
              <Link to="/tasklist">
                <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  My Task
                </p>
              </Link>
              <Link to="/admin">
                <p class="block mr-2 mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr  -4">
                  Admin
                </p>
              </Link>
              <Link to="/dashboard">
                <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  Dashboard
                </p>
              </Link>
              {/* <Link to="/leaderboard">
              <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                LeaderBorad
              </p>
            </Link> */}
              <Link to="/Customize">
                <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  Customize
                </p>
              </Link>
              <Link to="/Report">
                <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  Report
                </p>
              </Link>
              <Link to="/PrimaryTask">
                <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  Primary Tasks
                </p>
              </Link>
              <Link to="/Countdown">
                <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  CountDown
                </p>
              </Link>
            </div>
            <div>
              <Link to="/profile">
                <p class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                  Profile
                </p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

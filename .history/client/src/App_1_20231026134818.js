import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Example() {
  const [state, setstate] = useState([]);
  let a = useLocation();
  useEffect(() => {
    setstate(a.pathname.split("/"));
  }, []);
  return (
    <div className="">
      <nav class="flex items-center justify-between flex-wrap p-6 bg-[#1b365d]">
        <div class="w-full block lg:flex-grow sm:flex sm:justify-between  lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <div className="lg:block">
              <Link
                to="/tasklist"
                className="block mt-4 lg:inline-block active:text-red-600 sm:inline lg:mt-0 text-white hover:text-white mr-4 lg:text-sm sm:text-lg"
              >
                My Task
              </Link>
            </div>
            <div className="sm:hidden lg:block">
              <Link to="/admin">
                <p class="block mr-2 mt-4  lg:inline-block lg:mt-0 text-white hover:text-white active:text-blue-500">
                  Admin
                </p>
              </Link>
              <Link to="/dashboard">
                <p
                  onClick={(e) => {
                    e.target.classList.add("text-red-600");
                    e.target.classList.remove("text-white");
                  }}
                  class="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
                >
                  Dashboard
                </p>
              </Link>
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
              <Link to="/AdvanceDashboard">
                <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  Advance Dashboard
                </p>
              </Link>
            </div>
          </div>
          <div className="sm:-mt-6">
            <img
              alt="LOGO"
              src={require("./logo (1).jpg")}
              className="lg:w-32 sm:w-32 mr-2 sm:mt-4 lg:mt-0 rounded-md"
            />
          </div>
          <div className="sm:-mt-6">
            <Link to="/profile">
              <p class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                Profile
              </p>
            </Link>
          </div>
        </div>
      </nav>
      <nav
        class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          {state.map((value, index, array) => (
            <li>
              <div class="flex items-center">
                <svg
                  class="w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {value}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

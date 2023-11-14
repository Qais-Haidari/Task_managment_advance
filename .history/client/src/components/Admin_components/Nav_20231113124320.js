import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      <ul class="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li {
          location.pathname === 
        } >
          <Link to="/createUser">
            <p class="inline-block w-full p-4 text-gray-900 bg-green rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white">
              Create User
            </p>
          </Link>
        </li>
        <li class="w-full">
          <Link to="/createDepartment">
            <p class="inline-block w-full p-4 text-gray-900 bg-green focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
              Create Department
            </p>
          </Link>
        </li>
        <li class="w-full">
          <Link to="/createTask">
            <p class="inline-block w-full p-4 text-gray-900 bg-green focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
              Create Task
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

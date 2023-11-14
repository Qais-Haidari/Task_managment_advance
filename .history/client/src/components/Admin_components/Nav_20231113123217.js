import React from "react";
import { Link, Redirect } from "react-router-dom";

export default function Nav() {
  const addremove = (e) => {
    if (e === 1) {
      document.getElementById("itemCount1").classList.add("bg-white");
    } else {
      document.getElementById("itemCount2").classList.remove("bg-white");
      document.getElementById("itemCount3").classList.remove("bg-white");
    }
    if (e === 2) {
      document.getElementById("itemCount2").classList.add("bg-white");
    } else {
      document.getElementById("itemCount1").classList.remove("bg-white");
      document.getElementById("itemCount3").classList.remove("bg-white");
    }
    if (e === 3) {
      document.getElementById("itemCount1").classList.add("bg-white");
    } else {
      document.getElementById("itemCount2").classList.remove("bg-white");
      document.getElementById("itemCount3").classList.remove("bg-white");
    }
  };

  return (
    <div>
      <ul class="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li class="w-full">
          <Link to="/createUser" onClick={() => addremove(1)}>
            <p
              id={`itemCount1`}
              class="inline-block w-full p-4 text-gray-900 bg-green rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
            >
              Create User
            </p>
          </Link>
        </li>
        <li class="w-full">
          <Link to="/createDepartment" onClick={() => addremove(2)}>
            <p
              id={`itemCount2`}
              class="inline-block w-full p-4 text-gray-900 bg-green focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Create Department
            </p>
          </Link>
        </li>
        <li class="w-full">
          <Link to="/createTask" onClick={() => addremove(3)}>
            <p
              id={`itemCount3`}
              class="inline-block w-full p-4 text-gray-900 bg-green focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Create Task
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

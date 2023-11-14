import React from "react";
import { Link, Redirect } from "react-router-dom";

export default function Nav() {
  const addremove = (indexs) => {
    document.getElementById(`${indexs}`).classList.add("bg-blue-600");
    document.getElementById(`${indexs}`).classList.remove("bg-white");
    for (
      let index = 0;
      index < document.getElementsByClassName("bg-blue-600").length;
      index++
    ) {
      if (
        Number(document.getElementsByClassName("bg-blue-600")[index].id) !==
        indexs
      ) {
        document
          .getElementsByClassName("bg-blue-600")
          [index].classList.add("bg-white");
        document
          .getElementsByClassName("bg-blue-600")
          [index].classList.remove("bg-blue-600");
      }
    }
  };

  return (
    <div>
      <ul class="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li class="w-full">
          <Link to="/createUser" onClick={() => addremove()}>
            <p
              id={`itemCount1`}
              class="inline-block w-full p-4 text-gray-900 bg-green rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
            >
              Create User
            </p>
          </Link>
        </li>
        <li class="w-full">
          <Link to="/createDepartment" onClick={() => addremove()}>
            <p
              id={`itemCount2`}
              class="inline-block w-full p-4 text-gray-900 bg-green focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Create Department
            </p>
          </Link>
        </li>
        <li class="w-full">
          <Link to="/createTask" onClick={() => addremove()}>
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

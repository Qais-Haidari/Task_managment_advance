import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const [color, setcolor] = useState("");
  useEffect(() => {
    setcolor(location.pathname);
  }, []);
  return (
    <div>
      <div>
        <ul class="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li class="w-full">
            <Link to="/Customize/BulkUpdate">
              <p
                className={
                  color === "/Customize/BulkUpdate"
                    ? "inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                    : "inline-block w-full p-4 text-gray-900  rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                }
              >
                Bulk Update
              </p>
            </Link>
          </li>
          <li class="w-full">
            <Link to="/Customize/OldTask">
              <p className={
                  color === "/Customize/OldTask"
                    ? "inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                    : "inline-block w-full p-4 text-gray-900  rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                }>
                Old Tasks
              </p>
            </Link>
          </li>
          <li class="w-full">
            <Link to="/tasktimemanagment">
              <p className={
                  color === "/Customize/BulkUpdate"
                    ? "inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                    : "inline-block w-full p-4 text-gray-900  rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                }>
                Task Time Managment
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

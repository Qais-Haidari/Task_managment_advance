import React, { useState, useEffect } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [state, setstate] = useState([]);
  const [User, setUser] = useState([]);
  const [Department, setDepartment] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/PrimaryTasks`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://localhost:5000/Users`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://localhost:5000/Departments`)
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const User_ = (e) => {
    axios
      .get(`http://localhost:5000/PrimaryTasks/user/${e.target.value}`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  };
  const Department_ = (e) => {
    axios
      .get(`http://localhost:5000/PrimaryTasks/department/${e.target.value}`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  };
  const Priority_ = (e) => {
    axios
      .get(`http://localhost:5000/PrimaryTasks/department/${e.target.value}`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  };

  return (
    <>
      <Layout />
      <div className="">
        <div className="">
          <div className="flex ml-2 mt-2">
            <div>
              <p>User</p>
              <select
                onClick={User_}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {User.map((r) => (
                  <option>{r.First_Name}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="ml-2">Department</p>
              <select
                onClick={Department_}
                className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {Department.map((r) => (
                  <option>{r.Department_Name}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="ml-2">Priority</p>
              <select
                onClick={Priority_}
                className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Descr
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Summary
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Priority
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    start date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    end date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Tast duration
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Task Recurrence
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Assign to_User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Assign to Department
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Escalated to User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Escalated to Department
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.map((r) => (
                  <tr>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Short_description}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Summary}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Priority}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.start_date_time}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.end_date_time}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Tast_duration}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Task_Recurrence}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Assign_to_User}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Assign_to_Department}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Escalated_to_User}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {r.Escalated_to_Department}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-red text-sm">
                      <Link to={`/PrimaryTask/update/${r.ID}`}>Update</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

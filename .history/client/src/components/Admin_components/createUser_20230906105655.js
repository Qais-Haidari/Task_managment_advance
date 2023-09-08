import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../App_1";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default function Admin() {
  const [First, setFirst] = useState("");
  const [Last, setLast] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Start, setStart] = useState("");
  const [End, setEnd] = useState("");
  const [Is, setIs] = useState("");
  const [Department, setDepartment] = useState("");
  const [DepartmentList, setDepartmentList] = useState([]);

  const First_ = (e) => setFirst(e.target.value);
  const Last_ = (e) => setLast(e.target.value);
  const Email_ = (e) => setEmail(e.target.value);
  const Phone_ = (e) => setPhone(e.target.value);
  const Start_ = (e) => setStart(e.target.value);
  const End_ = (e) => setEnd(e.target.value);
  const Departments_ = (e) => setDepartment(e.target.value);

  const post = () => {
    axios
      .post("http://localhost:5000/createUser", {
        ID: Math.floor(Math.random() * 1000),
        First_Name: First,
        Last_Name: Last,
        Email: Email,
        Phone: Phone,
        Start_of_business: Start,
        End_of_business: End,
        Is_Admin: true,
        Department: Department,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  const [state, setState] = useState([]);
  const [Departments, setDepartments] = useState([]);
  const [UserTasks, setUserTasks] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/Users")
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));

    // GET ALL DEPARTMENTS
    axios
      .get("http://localhost:5000/Departments")
      .then((res) => {
        setDepartmentList(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  return (
    <>
      <Layout />
      <Nav />
      <div className="mx-8">
        <div class="py-5">
          <details class="group border p-3 delay-150 ">
            <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
              <span className=" text-green-600 text-xl">Create User</span>
              <span class="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <h1 className="text-2xl mt-4 font-bold mb-12 text-blue-700 text-center">
              Create User
            </h1>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className=" block w-full  text-gray-700 border rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  onChange={First_}
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block capitalize  tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  onChange={Last_}
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  onChange={Email_}
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                >
                  Mobile
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  onChange={Phone_}
                  type="Number"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                >
                  Start of Business
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  onChange={Start_}
                  type="time"
                  pattern="[0-9]{2}:[0-9]{2}"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                >
                  End of Business
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  onChange={End_}
                  type="time"
                  pattern="[0-9]{2}:[0-9]{2}"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <p className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2">
                  Department
                </p>
                <select
                  onClick={Departments_}
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Please Select Department</option>
                  {DepartmentList.map((r) => (
                    <option>{r.Department_Name}</option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <p className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2">
                  Department Admin
                </p>
                <select
                  onClick={Departments_}
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Please Select Department</option>
                  <option>Please Select Department</option>
                  {DepartmentList.map((r) => (
                    <option>{r.Department_Name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={post}
              class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </details>
        </div>
        <div class="-mt-5">
          <details class="group border p-3">
            <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
              <span className="text-green-600 text-xl">List User</span>
              <span class="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div class="container mx-auto px-4 sm:px-8">
              <div class="">
                <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table class="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          Name
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          last Name
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          Email
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          Phone
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          Start of Business
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          End of business
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          Department
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          Is Admin
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          Status
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                          Update
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((r) => (
                        <tr>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {r.First_Name}
                            </p>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {r.Last_Name}
                            </p>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {r.Email}
                            </p>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {r.Phone}
                            </p>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {r.Start_of_business}
                            </p>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {r.End_of_business}
                            </p>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {r.Departments}
                            </p>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span class="relative">
                                {r.Is_Admin === true ? "Yes" : "NO"}
                              </span>
                            </span>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span class="relative">{r.Status}</span>
                            </span>
                          </td>
                          <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <Link to={`/UpdateUser/${r.ID}`}>Update</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}

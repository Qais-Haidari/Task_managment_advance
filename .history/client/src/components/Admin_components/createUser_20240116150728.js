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
  const [Department, setDepartment] = useState("");
  const [DepartmentsAdmin, setDepartmentsAdmin] = useState("");
  const [DepartmentList, setDepartmentList] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [Level, setLevel] = useState(0);
  const [IC, setIC] = useState('');

  const First_ = (e) => setFirst(e.target.value);
  const Last_ = (e) => setLast(e.target.value);
  const Email_ = (e) => setEmail(e.target.value);
  const Phone_ = (e) => setPhone(e.target.value);
  const Start_ = (e) => setStart(e.target.value);
  const End_ = (e) => setEnd(e.target.value);
  const Departments_ = (e) => setDepartment(e.target.value);
  const DepartmentsAdmin_ = (e) => setDepartmentsAdmin(e.target.value);
  const Level__ = (e) => setLevel(e.target.value);
  const IC_ = (e) => setIC(e.target.value);

  const post = () => {
    
    if (
      !First ||
      !Email ||
      !Phone ||
      !Start ||
      !End ||
      !Department ||
      !DepartmentsAdmin ||
      !DepartmentList ||
      !UserList ||
      !Level ||
      !IC
    ) {
      alert('Please Complete the Form')
    } else {
    axios
      .post("http://localhost:5000/createUser", {
        ID: Math.floor(Math.random() * 1000),
        First_Name: First.trim(),
        Last_Name: Last,
        Email: Email,
        Phone: Phone,
        Start_of_business: Start,
        End_of_business: End,
        Is_Admin: true,
        Department: Department,
        DepartmentsAdmin: DepartmentsAdmin,
        Level: Level,
        IC: IC,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
    }
  };

  const [state, setState] = useState([]);
  const [Departments, setDepartments] = useState([]);
  const [UserTasks, setUserTasks] = useState("");
  useEffect(() => {
    axios
      .get("http://10.0.0.146:5000/Users")
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));

    // GET ALL DEPARTMENTS
    axios
      .get("http://10.0.0.146:5000/Departments")
      .then((res) => {
        setDepartmentList(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
      axios
      .get("http://10.0.0.146:5000/Users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  return (
    <>
      <Layout />
      <Nav />
      <div className="mx-8">
        <div class="py-5">
          <h1 className="text-2xl mt-4 font-bold mb-12 text-blue-700 text-center">
            Create User
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2"
                for="grid-first-name"
              >
                Username
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
                className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2"
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
                className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2"
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
                className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2"
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
                className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2"
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
              <p className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2">
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
              <p className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2">
                Department Admin
              </p>
              <input type="checkbox" onClick={(e) => } />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <p className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2">
                  Authorization Level ( 1: Normal User, 2: Admin User )
              </p>
              <select
                onClick={Level__}
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Level</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <p className="block capitalize mt-2 tracking-wide text-blue-700 font-bold text-sm mb-2">
                2IC User
              </p>
              <select
                onClick={IC_}
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Please Select 2IC User</option>
                {UserList.map((r) => (
                  <option>{r.First_Name}</option>
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
        </div>
        <div class="-mt-5">
          <div class="container mx-auto px-4 sm:px-8">
            <div class="">
              <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Name
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        last Name
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Authorization Level
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        2iC
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Email
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Phone
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Start of Business
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        End of business
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Department
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Department Admin
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Status
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Update
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 text-white  text-left text-md font-semibold  capitalize tracking-wider">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.map((r) => (
                      <tr>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.First_Name}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.Last_Name}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.Level}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.IC}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.Email}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.Phone}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.Start_of_business}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.End_of_business}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.Departments}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <p class=" whitespace-no-wrap">
                            {r.DepartmentsAdmin}
                          </p>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200  text-white bg-gray-900 text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 text-white bg-gray-900 opacity-50 rounded-full"
                            ></span>
                            <span class="relative text-white bg-gray-900">{r.Status === true ? 'true' : 'false'}</span>
                          </span>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <Link to={`/UpdateUser/${r.ID}`}>Update</Link>
                        </td>
                        <td class="px-5 py-2 border-b border-gray-200 text-white bg-gray-900 text-sm">
                          <button
                            className="bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                              axios
                                .post(
                                  `http://10.0.0.146:5000/DeleteUser/${r.ID}`
                                )
                                .then((res) => {
                                  window.location.reload();
                                })
                                .catch(
                                  (err) => (document.body.innerHTML = err)
                                );
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

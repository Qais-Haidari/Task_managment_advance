import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../App_1";
import Nav from "./Nav";
import { useParams } from "react-router-dom";

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
  let { id } = useParams();
  const [state, setState] = useState([]);
  const [Departments, setDepartments] = useState([]);
  const [UserTasks, setUserTasks] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/User/one/${id}`)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
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

  return (
    <>
      <Layout />
      <div className="mx-8">
        <div class="py-5">
          <h1 className="text-2xl mt-4 font-bold mb-12 text-blue-700 text-center">
            Update User
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
                value={state.}
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
                type="text"
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
            Update
          </button>
        </div>
      </div>
    </>
  );
}
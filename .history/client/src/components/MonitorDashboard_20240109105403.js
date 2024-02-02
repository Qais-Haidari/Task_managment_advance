import React, { useEffect, useState } from "react";
import Layout from "../App_1";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../Utils/Functions";
import MonitorDashboardItem from './MonitorDashboardAuth'

export default function Tasklist() {
  const [unAction, setunAction] = useState([]);
  const [UserFetch, setUserFetch] = useState([]);
  const [Escalated, setEscalated] = useState([]);

  const [User_, setUser] = useState([]);
  const [Priority_, setPriority] = useState([]);

  useEffect(() => {
    axios
    .get(`http://localhost:5000/Users`)
    .then((res) => {
      setUserFetch(res.data);
    })
    .catch((err) => (document.body.innerHTML = err));
    // axios
    //   .get(`http://localhost:5000/task/dashboard/Monitor/notEST/${MomentDate()}/${getCurrentTimeDashboard()}`)
    //   .then((res) => {
    //     setunAction(res.data);
    //   })
    //   .catch((err) => (document.body.innerHTML = err));

      axios(
        `http://localhost:5000/task/dashboard/Monitor/${MomentDate()}/${getCurrentTimeDashboard()}`
      )
        .then((res) => {
          setEscalated(res.data);
        })
        .catch((err) => (document.body.innerHTML = err));
  }, []);

  const filterApply = () => {
    axios
      .get(`http://localhost:5000/task/dashboard/Monitor/${document.getElementById('two').value}/${document.getElementById('one').value}/notEST/${MomentDate()}/${getCurrentTimeDashboard()}`)
      .then((res) => {
        setunAction(res.data);
        // console.log(res.data)
      })
      .catch((err) => (document.body.innerHTML = err));
      axios(
        `http://localhost:5000/task/dashboard/Monitor/${document.getElementById('two').value}/${document.getElementById('one').value}/${MomentDate()}/${getCurrentTimeDashboard()}`
      )
        .then((res) => {
          setEscalated(res.data);
        })
        .catch((err) => (document.body.innerHTML = err));
  }
  return (
    <>
      <Layout />
      <div className=" w-screen h-screen overflow-auto text-black">
        <div className="px-10 mt-6 flex">
          <h1 className="text-2xl font-bold text-white">Monitor Dashboard</h1>
          <select defaultValue='Critical' onClick={(e) => setPriority(e.target.value)} id="one" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block ml-2 " >
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
          </select>
          <select id="two" onClick={(e) => setUser(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block ml-2 " >
            {UserFetch.map((r) => (
              <option>{r.First_Name}</option>
            ))}
          </select>
        <button className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded-md"  onClick={filterApply}>Apply</button>
        </div>
        <div className="">
        <div className=" mt-4 overflow-auto">
          <div className="">
            {/* {unAction.map((r) => (
              <div
                className={`relative flex flex-col items-start p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 
                    ${r.Priority === "Low" ? " bg-gray-600" : "1"}
                    ${r.Priority === "High" ? " bg-orange-600" : "2"}
                    ${r.Priority === "Critical" ? " bg-red-600" : "13"}
                    ${r.Priority === "Medium" ? " bg-blue-600" : "14"}
                    `}
              >
                <span className="flex items-center h-6 px-3 text-md font-semibold text-white-500 bg-white rounded-full">
                  {r.Short_description}
                </span>
                <h4 className="mt-3 text-white text-md font-medium">
                  {r.Summary}
                </h4>
                <div className="flex space-x-4 ml-5">
                  {r.Assign_to_User === "" ? (
                    <></>
                  ) : (
                    <h4 className="mt-3 text-white text-md font-medium">
                      Assign to: {r.Assign_to_User}
                    </h4>
                  )}
                  {r.Assign_to_Department === "" ? (
                    <></>
                  ) : (
                    <h4 className="mt-3 text-white text-md font-medium">
                      Assign to Department: {r.Assign_to_Department}
                    </h4>
                  )}
                  {r.Escalated_to_User === "" ? (
                    <></>
                  ) : (
                    <h4 className="mt-3 text-white text-md font-medium">
                      Escalated to User: {r.Escalated_to_User}
                    </h4>
                  )}
                  {r.Escalated_to_Department === "" ? (
                    <></>
                  ) : (
                    <h4 className="mt-3 text-white text-md font-medium">
                      Escalated to Department: {r.Escalated_to_Department}
                    </h4>
                  )}
                  <span className=" text-white mt-3 text-md font-medium">
                    Due {r.end_time}
                  </span>
                  <span className=" text-white mt-3 text-md font-medium">
                    Priority {r.Priority}
                  </span>
                </div>
                <details className="group px-4 text-white mt-2">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="20"
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
                <MonitorDashboardItem ID={r.ID} />
                </details>
              </div>
            ))} */}
          </div>
        </div>
        <div className="mx-8 overflow-auto">
          <div className="">
            {Escalated.map((r) => (
              <div
                className={`relative flex flex-col items-start p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 
                    ${r.Priority === "Low" ? " bg-gray-600" : "1"}
                    ${r.Priority === "High" ? " bg-orange-600" : "2"}
                    ${r.Priority === "Critical" ? " bg-red-600" : "13"}
                    ${r.Priority === "Medium" ? " bg-blue-600" : "14"}
                    `}
              >
                <span className="flex items-center h-6 px-3 text-md font-semibold text-white-500 bg-white rounded-full">
                  {r.Short_description}
                </span>
                <h4 className="mt-3 text-white text-md font-medium">
                  {r.Summary}
                </h4>
                <div className="flex space-x-4 ml-5">
                  {r.Assign_to_User === "" ? (
                    <></>
                  ) : (
                    <h4 className="mt-3 text-white text-md font-medium">
                      Assign to: <span className=" font-normal">{r.Assign_to_User}</span>
                    </h4>
                  )}
                  {r.Assign_to_Department === "" ? (
                    <></>
                  ) : (
                    <h4 className="mt-3 text-white text-md font-medium">
                      Escalated to Department: <span className=" font-normal">{r.Assign_to_Department}</span>
                    </h4>
                  )}
                  {r.Escalated_to_User === "" ? (
                    <></>
                  ) : (
                    <h4 className="mt-3 text-white text-md font-medium">
                      Escalated to User: <span className=" font-normal">{r.Escalated_to_User}</span>
                    </h4>
                  )}
                  {r.Escalated_to_Department === "" ? (
                    <></>
                  ) : (
                    <h4 className="mt-3 text-white text-md font-medium">
                      Escalated to Department: <span className=" font-normal">{r.Escalated_to_Department}</span>
                    </h4>
                  )}
                </div>
                <details className="group px-4 text-white mt-2">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="20"
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
                <MonitorDashboardItem ID={r.ID}  />
                </details>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

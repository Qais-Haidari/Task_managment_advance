import React, { useEffect, useState } from "react";
import Layout from "../App_1";
import axios from "axios";

import { MomentDate, getCurrentTimeDashboard } from "../Utils/Functions";

export default function Tasklist() {
  const [unAction, setunAction] = useState([]);
  // const [Complete, setComplete] = useState([]);
  const [TaskAuth, setTaskAuth] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Escalated, setEscalated] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/dashboard/get/new/${MomentDate()}`)
      .then((res) => {
        setunAction(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://localhost:5000/task/dashboard/AuthTask/new/${MomentDate()}`)
      .then((res) => {
        setTaskAuth(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios(
      `http://localhost:5000/task/dashboard/Department/${MomentDate()}/${getCurrentTimeDashboard()}`
    )
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/task/dashboard/Escalated/${MomentDate()}/${getCurrentTimeDashboard()}`
      )
      .then((res) => {
        setEscalated(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  console.log(TaskAuth)
  return (
    <>
      <Layout />
      <div>
        <div className="flex flex-col w-screen h-screen overflow-auto text-black">
          <div className="px-10 mt-6">
            <h1 className="text-2xl font-bold text-white">Tasks Dashboard</h1>
          </div>
          <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
            <div className="flex flex-col flex-shrink-0 w-96">
              <div className="flex flex-col flex-shrink-0 w-96">
                <div className="flex items-center flex-shrink-0 h-10 px-2">
                  <span className="block text-sm font-semibold text-white">
                    InComplete
                  </span>
                  <span className="block text-md ml-64 font-semibold text-red-600">
                    {unAction.length}
                  </span>
                </div>
                {unAction.map((r) => (
                  <div
                    className={`relative flex flex-col items-start p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 
                    ${r.Priority === "Low" ? " bg-gray-600" : "1"}
                    ${r.Priority === "High" ? " bg-orange-600" : "2"}
                    ${r.Priority === "Critical" ? " bg-red-600" : "13"}
                    ${r.Priority === "Medium" ? " bg-yellow-300" : "14"}
                    `}
                  >
                    <span className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                      {r.Short_description}
                    </span>
                    <h4 className="mt-3 text-white text-sm font-medium">
                      {r.Summary}
                    </h4>
                    {r.Assign_to_User === "" ? (
                      <></>
                    ) : (
                      <h4 className="mt-3 text-white text-sm font-medium">
                        Assign to: {r.Assign_to_User}
                      </h4>
                    )}
                    <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-white fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-1 text-white leading-none">
                          Due {r.end_time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col flex-shrink-0 w-96">
              <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold text-white">
                  Department
                </span>
                <span className="block text-md ml-64 font-semibold text-red-600">
                  {Department.length}
                </span>
              </div>
              {Department.map((r) => (
                <div
                  className={`relative flex flex-col items-start p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 
                    ${r.Priority === "Low" ? " bg-gray-600" : "1"}
                    ${r.Priority === "High" ? " bg-orange-600" : "2"}
                    ${r.Priority === "Critical" ? " bg-red-600" : "13"}
                    ${r.Priority === "Medium" ? " bg-yellow-300" : "14"}
                    `}
                >
                  <p className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                    Department: {r.Assign_to_Department}
                  </p>
                  <span className="flex items-center h-6 px-3 mt-2 text-xs font-semibold text-white">
                    {r.Short_description}
                  </span>
                  <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-white fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="ml-1 text-white leading-none">
                        Due {r.end_time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col flex-shrink-0 w-96">
              <div className="flex flex-col flex-shrink-0 w-96">
                <div className="flex flex-col flex-shrink-0 w-96">
                  <div className="flex items-center flex-shrink-0 h-10 px-2">
                    <span className="block text-sm font-semibold text-white">
                      Further action required
                    </span>
                    <span className="block text-md ml-44 font-semibold text-red-600">
                      {TaskAuth.length}
                    </span>
                  </div>
                  {TaskAuth.map((r) => (
                    <div className="p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 bg-gray-600">
                      <div className="flex justify-around">
                        <p className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                          {r.ActionedBy}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-7 h-7 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                        <p className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                          {r.Approve_By}
                        </p>
                      </div>
                      <h4 className="mt-3 text-red-600 text-md font-medium">
                        Feedback: {r.feedback}
                      </h4>
                      <h4 className="mt-3 text-white text-sm font-medium">
                        {r.Questions}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-shrink-0 w-96">
              <div className="flex flex-col flex-shrink-0 w-96">
                <div className="flex flex-col flex-shrink-0 w-96">
                  <div className="flex items-center flex-shrink-0 h-10 px-2">
                    <span className="block text-sm font-semibold text-white">
                      Escalated
                    </span>
                    <span className="block text-md ml-64 font-semibold text-red-600">
                      {Escalated.length}
                    </span>
                  </div>
                  {Escalated.map((r) => (
                    <div className="p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 bg-gray-600">
                      <div className="flex justify-around">
                        {r.Assign_to_User ? (
                          <p className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                            User: {r.Assign_to_User}
                          </p>
                        ) : (
                          <></>
                        )}
                        {r.Assign_to_Department ? (
                          <p className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                            Department: {r.Assign_to_Department}
                          </p>
                        ) : (
                          <></>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-7 h-7 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                        {r.Escalated_to_User ? (
                          <p className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                            User: {r.Escalated_to_User}
                          </p>
                        ) : (
                          <></>
                        )}
                        {r.Escalated_to_Department ? (
                          <p className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                            Department: {r.Escalated_to_Department}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <h4 className="mt-3 text-white text-sm font-medium">
                        {r.Short_description}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col flex-shrink-0 w-80">
              <div className="flex flex-col flex-shrink-0 w-80">
                <div className="flex flex-col flex-shrink-0 w-80">
                  <div className="flex items-center flex-shrink-0 h-10 px-2">
                    <span className="block text-sm font-semibold text-white">
                      Complete
                    </span>
                  </div>
                  {Complete.map((r) => (
                    <div className="relative flex flex-col p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 bg-gray-600">
                      <span className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                        {r.Short_description}
                      </span>
                      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                        <div className="flex items-center">
                          <span className="ml-1 text-white leading-none">
                            Complete
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

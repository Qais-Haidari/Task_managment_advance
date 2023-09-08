import React, { useEffect, useState } from "react";
import Layout from "../App_1";
import axios from "axios";
import { Link } from "react-router-dom";
import ImageZoom from "react-image-zooom";
import "../index.css";
import { MomentDate, getCurrentTimeDashboard } from "../Utils/Functions";

export default function Tasklist() {
  const [state, setstate] = useState([]);
  const [Feedback, setFeedback] = useState("");
  const [Hidden, setHidden] = useState("");
  const [TaskAuth, setTaskAuth] = useState([]);
  const [TaskAuthDepartment, setTaskAuthDepartment] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Escalated, setEscalated] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/escalated/${MomentDate()}/${getCurrentTimeDashboard()}/${localStorage.getItem(
          "First_Name"
        )}/${localStorage.getItem("Department")}`
      )
      .then((res) => {
        setEscalated(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/task/${localStorage.getItem(
          "First_Name"
        )}/${getCurrentTimeDashboard()}/${MomentDate()}`
      )
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/Department/owner/${localStorage.getItem(
          "Department"
        )}/${getCurrentTimeDashboard()}/${MomentDate()}`
      )
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/TaskAuthApprove/${localStorage.getItem(
          "First_Name"
        )}`
      )
      .then((res) => {
        setTaskAuth(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/TaskAuthApproveDepartment/${localStorage.getItem(
          "Department"
        )}`
      )
      .then((res) => {
        setTaskAuthDepartment(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  const Feedback_ = (e) => setFeedback(e.target.value);
  const Accpet = (a, b) => {
    axios
      .post(`http://localhost:5000/AuthUpdateApprove/${b}/${a}`, {})
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  const Reject = (a) => {
    axios
      .post(`http://localhost:5000/AuthUpdateFeedback/${a}`, {
        feeback: Feedback,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  return (
    <>
      <Layout />
      <div className="flex flex-col h-screen overflow-auto text-black bg-gradient-to-tr bg-green-600">
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold text-center text-white">
            My Tasks
          </h1>
        </div>
        <div className="flex sm:flex-col lg:flex-row flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold text-white">
                Tasks
              </span>
            </div>
            {state.map((r) => (
              <Link to={`/viewtask/${r.ID}`}>
                <div
                  className={`relative flex flex-col items-start p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 
                    ${r.Priority === "Low" ? " bg-gray-600" : "1"}
                    ${r.Priority === "High" ? " bg-orange-600" : "2"}
                    ${r.Priority === "Critical" ? " bg-red-600" : "13"}
                    ${r.Priority === "Medium" ? " bg-yellow-300" : "14"}
                    `}
                  draggable="true"
                >
                  <span className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                    {r.Short_description}
                  </span>
                  <h4 className="mt-3 text-white text-sm font-medium">
                    {r.Summary}
                  </h4>
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
              </Link>
            ))}
          </div>
          <div className="flex sm:-mr-4 flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold text-white">
                Department Tasks
              </span>
            </div>
            {Department.map((r) => (
              <Link to={`/viewtask/${r.ID}`}>
                <div
                  className={`relative flex flex-col items-start p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 
                ${r.Priority === "Low" ? " bg-gray-600" : "1"}
                ${r.Priority === "High" ? " bg-orange-600" : "2"}
                ${r.Priority === "Critical" ? " bg-red-600" : "13"}
                ${r.Priority === "Medium" ? " bg-yellow-300" : "14"}
                `}
                  draggable="true"
                >
                  <span className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                    {r.Short_description}
                  </span>
                  <h4 className="mt-3 text-white text-sm font-medium">
                    {r.Summary}
                  </h4>
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
              </Link>
            ))}
          </div>
          <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold text-white">
                Escalated
              </span>
            </div>
            {Escalated.map((r) => (
              <Link to={`/viewtask/${r.ID}`}>
                <div
                  className={`relative flex flex-col items-start p-4 mt-3 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 
                    ${r.Priority === "Low" ? " bg-gray-600" : "1"}
                    ${r.Priority === "High" ? " bg-orange-600" : "2"}
                    ${r.Priority === "Critical" ? " bg-red-600" : "13"}
                    ${r.Priority === "Medium" ? " bg-yellow-300" : "14"}
                    `}
                  draggable="true"
                >
                  <span className="flex items-center h-6 px-3 text-xs font-semibold text-white-500 bg-white rounded-full">
                    {r.Short_description}
                  </span>
                  <h4 className="mt-3 text-white text-sm font-medium">
                    {r.Summary}
                  </h4>
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
              </Link>
            ))}
          </div>
          {/* approve or pending */}
          <div className="flex flex-col flex-shrink-0 w-6/12">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold text-white">
                Approve Tasks
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto">
              <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100">
                {TaskAuth.map((r) => (
                  <details className="group w-full mb-2 border-b-2 border-red-500">
                    <summary className="flex justify-between items-center  font-medium cursor-pointer list-none">
                      <span className="">{r.Questions}</span>
                      <span className="transition group-open:rotate-180">
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
                    {r.Attachment === "Yes" ? (
                      <div className="image">
                        <ImageZoom
                          src={require(`../Image/${r.AttachmentPath}`)}
                          alt="Zoom-images"
                          loading="lazy"
                          className="image"
                          zoom="300"
                        />
                      </div>
                    ) : (
                      <p>Value: {r.Value}</p>
                    )}
                    <p>Submit Date: {r.SubmitDate}</p>
                    <input
                      type="text"
                      placeholder="Feedback..."
                      className=" h-9 mt-2"
                      onChange={Feedback_}
                    />
                    <input
                      type="hidden"
                      placeholder="Feedback..."
                      className=" h-9 mt-2"
                      value={r.ID}
                      id="HIdden"
                    />
                    <input
                      type="hidden"
                      placeholder="Feedback..."
                      className=" h-9 mt-2"
                      value={r.Task_ID}
                      id="HIdden_Task_ID"
                    />
                    <div>
                      <button
                        onClick={() => Accpet(r.Task_ID, r.ID)}
                        className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => Reject(r.ID)}
                        className="bg-red-500 ml-2 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </details>
                ))}
                {TaskAuthDepartment.map((r) => (
                  <details className="group w-full  mb-2 border-b-2 border-red-500">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="">{r.Questions}</span>
                      <span className="transition group-open:rotate-180">
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
                    {r.Attachment === "Yes" ? (
                      <div className="image">
                        <ImageZoom
                          src={require(`../Image/${r.AttachmentPath}`)}
                          alt="Zoom-images"
                          className="image"
                          zoom="300"
                        />
                      </div>
                    ) : (
                      <p>Value: {r.Value}</p>
                    )}
                    <p>Submit Date: {r.SubmitDate}</p>
                    <input
                      type="text"
                      placeholder="Feedback..."
                      className=" h-9 mt-2"
                      onChange={Feedback_}
                    />
                    <input
                      type="hidden"
                      placeholder="Feedback..."
                      className=" h-9 mt-2"
                      value={r.ID}
                      id="HIdden"
                    />
                    <input
                      type="hidden"
                      placeholder="Feedback..."
                      className=" h-9 mt-2"
                      value={r.Task_ID}
                      id="HIdden_Task_ID"
                    />
                    <div>
                      <button
                        onClick={() => Accpet(r.Task_ID, r.ID)}
                        className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => Reject(r.ID)}
                        className="bg-red-500 ml-2 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
          {/* -------------------------------------------------------------- */}
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Layout from "../App_1";
import axios from "axios";
import { useParams } from "react-router-dom";
import TaskAuth from "./Admin_components/TaskAuth";

export default function Viewtask(props) {
  const params = useParams();
  const [state, setstate] = useState([]);
  const [Auth, setAuth] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/${params.TaskID}`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://localhost:5000/Auth/${params.TaskID}`)
      .then((res) => {
        setAuth(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <Layout />
      <div>
        <div>
          <div className="mt-3">
            <div className="px-4 sm:px-8">
              <div className="">
                <a
                  href="/#/tasklist"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2"
                >
                  Back
                </a>
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal sm:hidden mt-2 lg:block">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Priority
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Start Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          End Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Task Duration
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Assign To user
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Assign To Department
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Escalated To user
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Escalated To Department
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Start Of Business
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          End Of Business
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 capitalize tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {state.Priority}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {state.start_date_time}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {state.end_date_time}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {state.Tast_duration}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {state.Assign_to_User}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {state.Assign_to_Department}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {state.Escalated_to_User}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {state.Escalated_to_Department}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span className="relative">
                              {state.Start_Of_Business}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span className="relative">
                              {state.End_Of_Business}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              {state.is_admin_approve}
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="m-5 flex">
                    <div>
                      <h1 className="text-md text-green-600">
                        Short Description
                      </h1>
                      <p>{state.Short_description}</p>
                    </div>
                    <div className="ml-10">
                      <h1 className="text-md text-green-600" onClick={() => {
                        
                      }} >Summary</h1>
                      <p className="hidden">{state.Summary}</p>
                    </div>
                  </div>
                  <div>
                    <h1 className="lg:text-center sm:text-left sm:ml-4 text-blue text-lg">
                      Task Requirments
                    </h1>

                    <div>
                      {Auth.map((r) => (
                        <TaskAuth
                          ID={r.ID}
                          Task_ID={r.Task_ID}
                          Type={r.Type}
                          MinValue={r.MinValue}
                          MaxValue={r.MaxValue}
                          ExptectedValue={r.ExptectedValue}
                          Questions={r.Questions}
                          Attachment={r.Attachment}
                          AttachmentPath={r.AttachmentPath}
                          Feedback={r.feedback}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

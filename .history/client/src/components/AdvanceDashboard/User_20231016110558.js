import React, { useEffect, useState } from "react";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";
import Axios from "axios";

export default function User({ User }) {
  const [state, setstate] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Incomplete, setIncomplete] = useState([]);
  const [Further, setFurther] = useState([]);
  const [Complete, setComplete] = useState([]);
  const [Req, setReq] = useState([]);
  const [TaskComplete, setTaskComplete] = useState([]);
  const [TaskInComplete, setTaskInComplete] = useState([]);

  let TaskID = [];
  let Requirments = [];
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/task/advancedashboard/User/${MomentDate()}/${
          User[0].Name
        }`
      )
      .then((res) => {
        setstate(res.data);
        let state = res.data;
        for (let index = 0; index < state.length; index++) {
          if (state[index].is_task_done === false) {
            setTaskComplete((oldArray) => [
              ...oldArray,
              state[index].Assign_to_User,
            ]);
          } else {
            setTaskInComplete((oldArray) => [
              ...oldArray,
              state[index].Assign_to_User,
            ]);
          }
          TaskID.push(state[index].ID);
        }
        axios
          .post(
            `http://localhost:5000/task/advancedasbhboard/TaskID/${MomentDate()}/${
              User[0].Name
            }`,
            { task: TaskID.toString() }
          )
          .then((res) => {
            for (let index = 0; index < res.data.length; index++) {
              for (let index1 = 0; index1 < res.data[index].length; index1++) {
                let a = res.data[index][index1];
                Requirments.push(a);
              }
            }
            setReq(Requirments);
            for (let index2 = 0; index2 < Requirments.length; index2++) {
              if (
                Requirments[index2].isAdminApproved === "NO" &&
                Requirments[index2].isUserSubmit === "NO"
              ) {
                setIncomplete((oldArray) => [...oldArray, Requirments[index2]]);
              } else if (
                Requirments[index2].isUserSubmit === "Yes" &&
                Requirments[index2].isAdminApproved === "NO"
              ) {
                setFurther((oldArray) => [...oldArray, Requirments[index2]]);
              } else if (
                Requirments[index2].isUserSubmit === "Yes" &&
                Requirments[index2].isAdminApproved === "Yes"
              ) {
                setComplete((oldArray) => [...oldArray, Requirments[index2]]);
              }
            }
          })
          .catch((err) => (document.body.innerHTML = err));
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <table class="table-auto w-full">
        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">User</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">Tasks</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">Incomplete</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">Completed</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">Further Action</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">Requirments</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">Completed</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">More</div>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-100 h-full">
          <tr>
            <td class="p-2 whitespace-nowrap">
              <div class="">
                <div class="text-lg text-center ">{User[0].Name}</div>
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-center">
                {TaskComplete.length + TaskInComplete.length}
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-center">{TaskComplete.length}</div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-center text-lg font-medium text-green-500">
                {TaskInComplete.length}
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-center">{Further.length}</div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-center">{Req.length}</div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-center">{Complete.length}</div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                  More
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <details className="group p-3">
        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
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
        <table class="table-auto w-full">
          <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
              Status
            </th>
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
          </thead>
          <tbody class="text-sm divide-y divide-gray-100 h-full">
            {state.map((r) => (
              <tr>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  {r.is_task_done === true ? (
                    <p className=" whitespace-no-wrap">
                      <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 21 21"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
                        />
                      </svg>
                    </p>
                  ) : (
                    <p className=" text-red-600 text-lg whitespace-no-wrap">
                      X
                    </p>
                  )}
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">{r.Short_description}</p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">{r.Summary}</p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">{r.Priority}</p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">{r.start_date_time}</p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">{r.end_date_time}</p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">{r.Task_Recurrence}</p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">{r.Assign_to_User}</p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">
                    {r.Assign_to_Department}
                  </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">{r.Escalated_to_User}</p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200  text-sm">
                  <p className=" whitespace-no-wrap">
                    {r.Escalated_to_Department}
                  </p>
                </td>
              </tr>
              <details className="group border p-3 mx-2 mt-2">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
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
              </details>
            ))}
          </tbody>
        </table>
      </details>
    </>
  );
}
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
              Req
            </th>
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
                  <button
                    data-modal-target="staticModal"
                    data-modal-toggle="staticModal"
                    class=""
                    type="button"
                  >
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                      <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                    </svg>
                  </button>
                </td>
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
            ))}
          </tbody>
        </table>
      </details>

      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Static modal
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-6 space-y-6">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>

            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="staticModal"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="staticModal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

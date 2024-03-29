import React, { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ImageZoom from "react-image-zooom";
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
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [PickedID, setPickedID] = useState("");
  const [PickedReq, setPickedReq] = useState([]);
  const [Feedback, setFeedback] = useState("");

  let TaskID = [];
  let Requirments = [];
  useEffect(() => {
    axios
      .get(
        `http://10.0.0.146:5000/task/advancedashboard/User/${MomentDate()}/${User}`
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
            `http://10.0.0.146:5000/task/advancedasbhboard/TaskID/${MomentDate()}/${
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
  const Feedback_ = (e) => setFeedback(e.target.value);
  const Accpet = (a, b) => {
    axios
      .post(`http://10.0.0.146:5000/AuthUpdateApprove/${b}/${a}`, {})
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  const Reject = (a, b) => {
    axios
      .post(`http://10.0.0.146:5000/AuthUpdateFeedback/${a}/${b}`, {
        feeback: Feedback,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  const ReqLoad = (r) => {
    setPickedID(r);
    setPickedReq("");
    for (let index = 0; index < Req.length; index++) {
      if (Req[index].Task_ID === r) {
        setPickedReq((oldArray) => [...oldArray, Req[index]]);
      }
    }
    setOpen(true);
  };
  return (
    <>
      <table class="table-auto w-full">
        <thead class="text-xs font-semibold uppercase sticky text-white bg-gray-900">
          <tr>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">User</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Tasks</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Incomplete</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Completed</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Further Action</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Requirments</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Completed</div>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-100 h-full">
          <tr>
            <td class="p-2 whitespace-nowrap">
              <div class="">
                <div class="text-lg text-left ">{User}</div>
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-left">
                {TaskComplete.length + TaskInComplete.length}
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-left">{TaskComplete.length}</div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-left text-lg font-medium text-green-500">
                {TaskInComplete.length}
              </div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-left">{Further.length}</div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-left">{Req.length}</div>
            </td>
            <td class="p-2 whitespace-nowrap">
              <div class="text-lg text-left">{Complete.length}</div>
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
          <thead class="text-xs font-semibold uppercase text-white bg-gray-900">
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
                <td
                  className="px-5 py-2 border-b border-gray-200  text-sm"
                  onClick={() => {
                    ReqLoad(r.ID);
                  }}
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
                </td>
                <td className="px-5 py-2 border-b border-gray-200 text-sm">
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-9000 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex h-screen justify-center p-4 text-left items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-full w-full">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
                        {PickedReq.map((r) => (
                          <>
                            {/* <p>{r.AttachmentPath}</p> */}

                            {!r.AttachmentPath || !r.value ? (
                              <>
                                <p className="mt-2">{r.Questions}</p>
                                <p>Not Submited</p>
                              </>
                            ) : (
                              <>
                                {r.Attachment === "Yes" && r.AttachmentPath ? (
                                  <div className="image">
                                    <ImageZoom
                                      src={`http://10.0.0.146:5000/${r.AttachmentPath}`}
                                      alt="Zoom-images"
                                      loading="lazy"
                                      className="image"
                                      zoom="300"
                                    />
                                  </div>
                                ) : (
                                  <p>Value: {r.Value}</p>
                                )}
                                <input
                                  type="hidden"
                                  placeholder="Feedback..."
                                  className=" h-9 mt-2"
                                  value={r.Task_ID}
                                  id="HIdden_Task_ID"
                                />
                                <input
                                  type="hidden"
                                  placeholder="Feedback..."
                                  className=" h-9 mt-2"
                                  value={r.ID}
                                  id="HIdden"
                                />
                                <p>Submit Date: {r.SubmitDate}</p>
                                <input
                                  type="text"
                                  placeholder="Feedback..."
                                  className=" h-9 mt-2"
                                  onChange={Feedback_}
                                />
                                <div>
                                  <button
                                    onClick={() => Accpet(r.Task_ID, r.ID)}
                                    className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => Reject(r.ID, r.Task_ID)}
                                    className="bg-red-500 ml-2 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-900 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

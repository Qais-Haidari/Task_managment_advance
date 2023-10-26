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
                        <div class="font-semibold text-left">
                          Further Action
                        </div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Requirments</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Completed</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">More</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-sm divide-y divide-gray-100 h-full">
                    <tr>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="font-medium text-lg text-gray-800">
                            {User[0].Name}
                          </div>
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-left">
                          {TaskComplete.length + TaskInComplete.length}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-left">
                          {TaskComplete.length}
                        </div>
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
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-left">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                            More
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

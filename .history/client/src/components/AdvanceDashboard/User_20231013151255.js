import React, { useEffect, useState } from "react";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";
import Axios from "axios";

export default function User({ User }) {
  const [state, setstate] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Incomplete, setIncomplete] = useState([]);
  const [Complete, setComplete] = useState([]);
  const [FurtherAction, setFurtherAction] = useState([]);
  const [Req, setReq] = useState([]);
  const [Task, setTask] = useState([]);
  const [Get, setGet] = useState(false);
  let complete = [];
  let incomplete = [];
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
            complete.push({
              User: state[index].Assign_to_User,
            });
          } else {
            incomplete.push({
              User: state[index].Assign_to_User,
            });
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
            let completed = [];
            let incompleted = [];
            let FurtherAction = [];
            for (let index = 0; index < res.data.length; index++) {
              for (let index1 = 0; index1 < res.data[index].length; index1++) {
                let a = res.data[index][index1];
                Requirments.push(a);
              }
            }
            setReq(Requirments);
            for (let index2 = 0; index2 < Requirments.length; index2++) {
              // console.log(Requirments[index2]);
              if (
                Requirments[index2].isAdminApproved === "NO" &&
                Requirments[index2].isUserSubmit === "NO"
              ) {
                incompleted.push(Requirments[index2]);
              } else if (
                Requirments[index2].isUserSubmit === "NO" &&
                Requirments[index2].isAdminApproved === "Yes"
              ) {
                let a = Requirments[index2];
                FurtherAction.push(a);
              } else if (
                Requirments[index2].isUserSubmit === "Yes" &&
                Requirments[index2].isAdminApproved === "Yes"
              ) {
                let a = Requirments[index2];
                complete
              }
            }
          })
          .catch((err) => (document.body.innerHTML = err));
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  console.log(Complete, FurtherAction, Incomplete);
  return (
    <>
      <section class="antialiased  text-gray-600 mt-1 px-2 rounded-md">
        <div class="flex flex-col">
          <div class="w-full bg-white shadow-lg rounded-sm border">
            <div class="p-3">
              <div class="overflow-x-auto">
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
                        <div class="font-semibold text-left">Completed</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Incomplete</div>
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
                          {complete.length + incomplete.length}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left text-lg font-medium text-green-500">
                          {incomplete.length}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-left">{complete.length}</div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-left">
                          {FurtherAction.length}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-left">{Req.length}</div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-left">??</div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-left">??</div>
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

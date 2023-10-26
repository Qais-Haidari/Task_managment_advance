import React, { useEffect, useState } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";

export default function Tasklist({ Department }) {
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
  const Feedback_ = (e) => setFeedback(e.target.value);
  const Accpet = (a, b) => {
    axios
      .post(`http://localhost:5000/AuthUpdateApprove/${b}/${a}`, {})
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  const Reject = (a, b) => {
    axios
      .post(`http://localhost:5000/AuthUpdateFeedback/${a}/${b}`, {
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
      <section class="antialiased  text-gray-600 mt-1 px-2 rounded-md">
        <div class="flex flex-col">
          <div class="w-full bg-white shadow-lg rounded-sm border">
            <div class="p-3">
              <div class="overflow-x-auto">
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
                        <div class="font-semibold text-center">
                          Further Action
                        </div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">Requirments</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">Completed</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-sm divide-y divide-gray-100 h-full"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

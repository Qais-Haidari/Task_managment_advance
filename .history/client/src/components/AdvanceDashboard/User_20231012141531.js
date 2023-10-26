import React, { useEffect, useState } from "react";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";

export default function User({ User }) {
  const [Users, setUsers] = useState([]);
  const [Incomplete, setIncomplete] = useState([]);
  const [Complete, setComplete] = useState([]);
  const [Task, setTask] = useState([]);
  const [Requirments, setRequirments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/task/advancedashboard/User/${MomentDate()}/${
          User[0].Name
        }`
      )
      .then((res) => {
        console.log(res.data);
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].is_task_done === false) {
            let arr = [];
            arr.push({
              User: res.data[index].Assign_to_User,
            });
            setIncomplete(arr);
          } else {
            let arr2 = [];
            arr2.push({
              User: res.data[index].Assign_to_User,
            });
            setComplete(arr2);
          }
        }
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  cl
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
                        <div class="font-semibold text-left">Completed</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">
                          Further Action
                        </div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">Incomplete</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">Tasks</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">Requirments</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">More</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-sm divide-y divide-gray-100 h-full">
                    <tr>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="font-medium text-gray-800">
                            {User[0].Name}
                          </div>
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left">alexshatov@gmail.com</div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left font-medium text-green-500">
                          $2,890.66
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-lg text-center">??</div>
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

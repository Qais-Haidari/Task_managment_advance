import React, { useEffect, useState } from "react";
import Layout from "../../App_1";
import axios from "axios";

import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";

export default function Tasklist() {
  const [unAction, setunAction] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/advancedashboard/${MomentDate()}`)
      .then((res) => {
        setunAction(res.data);
        let AssToUser = [];
        let AssToDep = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Assign_to_User) {
            AssToUser.push({
              Name: res.data[i].Assign_to_User,
            });
          }
        }
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Assign_to_Department) {
            AssToDep.push({
              Name: res.data[i].Assign_to_Department,
            });
          }
        }
        let uniUser = AssToUser.map((e) => e["Count"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((obj) => AssToUser[obj])
          .map((e) => AssToUser[e]);

        let uniDep = AssToDep.map((e) => e["Count"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((obj) => AssToDep[obj])
          .map((e) => AssToDep[e]);
        console.log(uniDep);
        console.log(uniUser);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/task/dashboard/Escalated/${MomentDate()}/${getCurrentTimeDashboard()}`
      )
      .then((res) => {
        let AssToEXUser = [];
        let AssToEXDep = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Escalated_to_User) {
            AssToEXUser.push({
              Name: res.data[i].Escalated_to_User,
            });
          }
        }
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Escalated_to_Department) {
            AssToEXDep.push({
              Name: res.data[i].Escalated_to_Department,
            });
          }
        }
        let uniEXUser = AssToEXUser.map((e) => e["Count"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((obj) => AssToEXUser[obj])
          .map((e) => AssToEXUser[e]);

        let uniEXDep = AssToEXDep.map((e) => e["Count"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((obj) => AssToEXDep[obj])
          .map((e) => AssToEXDep[e]);
        console.log(uniEXDep);
        console.log(uniEXUser);
        // setEscalated(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <Layout />
      <section class="antialiased  text-gray-600 h-screen mt-1 px-2 rounded-md">
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
                        <div class="font-semibold text-left">Department</div>
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
                            Alex Shatov
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

import React, { useEffect, useState } from "react";
import Layout from "../../App_1";
import axios from "axios";

import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";

export default function Tasklist() {
  const [unAction, setunAction] = useState([]);
  // const [Complete, setComplete] = useState([]);
  const [TaskAuth, setTaskAuth] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Escalated, setEscalated] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/dashboard/get/new/${MomentDate()}`)
      .then((res) => {
        setunAction(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    // axios
    //   .get(`http://localhost:5000/task/dashboard/complete/new/${MomentDate()}`)
    //   .then((res) => {
    //     setComplete(res.data);
    //   })
    //   .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://localhost:5000/task/dashboard/AuthTask/new/${MomentDate()}`)
      .then((res) => {
        console.log(res.data);
        setTaskAuth(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios(
      `http://localhost:5000/task/dashboard/Department/${MomentDate()}/${getCurrentTimeDashboard()}`
    )
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/task/dashboard/Escalated/${MomentDate()}/${getCurrentTimeDashboard()}`
      )
      .then((res) => {
        setEscalated(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <Layout />
      <section class="antialiased  text-gray-600 h-screen px-4">
        <div class="flex flex-col">
          <div class="w-full bg-white shadow-lg rounded-sm border ">
            <header class="px-5 py-4 border-b border-gray-100">
              <h2 class="font-semibold text-gray-800">Customers</h2>
            </header>
            <div class="p-3">
              <div class="overflow-x-auto">
                <table class="table-auto w-full">
                  <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Name</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Email</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Spent</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-center">Country</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-sm divide-y divide-gray-100">
                    <tr>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img
                              class="rounded-full"
                              src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                              width="40"
                              height="40"
                              alt="Alex Shatov"
                            />
                          </div>
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

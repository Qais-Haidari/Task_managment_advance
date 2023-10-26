import React, { useEffect, useState } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";
import ScreemUser from "../AdvanceDashboard/User";
import ScreenEXUser from "../AdvanceDashboard/EXUser";
import ScreemDepartment from "../AdvanceDashboard/Department";
import ScreemEXDepartment from "../AdvanceDashboard/EXDepartment";

export default function Tasklist() {
  const [User, setUser] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [ExUser, setExUser] = useState([]);
  const [EXDepartment, setEXDepartment] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/advancedashboard/${MomentDate()}`)
      .then((res) => {
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

        setUser(uniUser);
        setDepartment(uniDep);
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
        setExUser(uniEXUser);
        setEXDepartment(uniEXDep);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <Layout />
      <section class="antialiased  text-gray-600 mt-1 px-2 rounded-md">
        <div class="flex flex-col">
          <div class="w-full bg-white shadow-lg rounded-sm border">
            <div class="p-3">
              <div>
              <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
  <div class="flex justify-between mb-3">
    <div class="flex items-center">
      <div class="flex justify-center items-center">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pr-1">Your team's progress</h5>
        <svg data-popover-target="chart-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
        </svg>
        <div data-popover id="chart-info" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
            <div class="p-3 space-y-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
                <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                <a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg class="w-2 h-2 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg></a>
            </div>
            <div data-popper-arrow></div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
    <div class="grid grid-cols-3 gap-3 mb-2">
      <dl class="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
        <dt class="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1">12</dt>
        <dd class="text-orange-600 dark:text-orange-300 text-sm font-medium">To do</dd>
      </dl>
      <dl class="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
        <dt class="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1">23</dt>
        <dd class="text-teal-600 dark:text-teal-300 text-sm font-medium">In progress</dd>
      </dl>
      <dl class="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
        <dt class="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm font-medium flex items-center justify-center mb-1">64</dt>
        <dd class="text-blue-600 dark:text-blue-300 text-sm font-medium">Done</dd>
      </dl>
    </div>
    <button data-collapse-toggle="more-details" type="button" class="hover:underline text-xs text-gray-500 dark:text-gray-400 font-medium inline-flex items-center">Show more details <svg class="w-2 h-2 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>
    <div id="more-details" class="border-gray-200 border-t dark:border-gray-600 pt-3 mt-3 space-y-2 hidden">
      <dl class="flex items-center justify-between">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal">Average task completion rate:</dt>
        <dd class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
          <svg class="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg> 57%
        </dd>
      </dl>
      <dl class="flex items-center justify-between">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal">Days until sprint ends:</dt>
        <dd class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">13 days</dd>
      </dl>
      <dl class="flex items-center justify-between">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal">Next meeting:</dt>
        <dd class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">Thursday</dd>
      </dl>
    </div>
  </div>

  <!-- Radial Chart -->
  <div class="py-6" id="radial-chart"></div>

  <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
    <div class="flex justify-between items-center pt-5">
      <!-- Button -->
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="lastDaysdropdown"
        data-dropdown-placement="bottom"
        class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
        type="button">
        Last 7 days
        <svg class="w-2.5 m-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="lastDaysdropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
            </li>
          </ul>
      </div>
      <a
        href="#"
        class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
        Progress report
        <svg class="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </a>
    </div>
  </div>
</div>
              </div>
              <div class="overflow-x-auto">
                {User.map((r) => (
                  <ScreemUser User={User} />
                ))}
                {/* {Department.map((r) => (
                  <ScreemDepartment Department={Department} />
                ))} */}
                {/* {ExUser.map((r) => (
                <ScreenEXUser EXUser={ExUser} />
              ))}
              {EXDepartment.map((r) => (
                <ScreemEXDepartment EXDepartment={EXDepartment} />
              ))} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
      <div>
        <div class="flex flex-col w-screen h-screen overflow-auto text-black">
          <div class="px-10 mt-6">
            <h1 class="text-2xl font-bold text-white">Tasks Dashboard</h1>
          </div>
          <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Traffic by device
                </h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                  Desktop
                </span>
              </div>
              <a
                href="#"
                class="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
              >
                Full report
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>
            <div id="traffic-by-device" style="min-height: 278.7px;">
              <div
                id="apexchartsxxdnxbal"
                class="apexcharts-canvas apexchartsxxdnxbal apexcharts-theme-light"
                style="width: 590px; height: 278.7px;"
              >
                <svg
                  id="SvgjsSvg2844"
                  width="590"
                  height="278.70000000000005"
                  version="1.1"
                  class="apexcharts-svg"
                  transform="translate(0, 0)"
                  style="background: transparent;"
                >
                  <g
                    id="SvgjsG2846"
                    class="apexcharts-inner apexcharts-graphical"
                    transform="translate(158, 0)"
                  >
                    <defs id="SvgjsDefs2845">
                      <clipPath id="gridRectMaskxxdnxbal">
                        <rect
                          id="SvgjsRect2848"
                          width="282"
                          height="300"
                          x="-3"
                          y="-1"
                          rx="0"
                          ry="0"
                          opacity="1"
                          stroke-width="0"
                          stroke="none"
                          stroke-dasharray="0"
                          fill="#fff"
                        ></rect>
                      </clipPath>
                      <clipPath id="forecastMaskxxdnxbal"></clipPath>
                      <clipPath id="nonForecastMaskxxdnxbal"></clipPath>
                      <clipPath id="gridRectMarkerMaskxxdnxbal">
                        <rect
                          id="SvgjsRect2849"
                          width="280"
                          height="302"
                          x="-2"
                          y="-2"
                          rx="0"
                          ry="0"
                          opacity="1"
                          stroke-width="0"
                          stroke="none"
                          stroke-dasharray="0"
                          fill="#fff"
                        ></rect>
                      </clipPath>
                    </defs>
                    <g id="SvgjsG2850" class="apexcharts-pie">
                      <g id="SvgjsG2851" transform="translate(0, 0) scale(1)">
                        <circle
                          id="SvgjsCircle2852"
                          r="83.61219512195123"
                          cx="138"
                          cy="138"
                          fill="transparent"
                        ></circle>
                        <g id="SvgjsG2853" class="apexcharts-slices">
                          <g
                            id="SvgjsG2854"
                            class="apexcharts-series apexcharts-pie-series"
                            seriesName="Desktop"
                            rel="1"
                          >
                            <path
                              id="SvgjsPath2855"
                              d="M 138 9.365853658536565 A 128.63414634146343 128.63414634146343 0 1 1 15.661656903886822 177.7501372764262 L 58.48007698752643 163.837589229677 A 83.61219512195123 83.61219512195123 0 1 0 138 54.38780487804877 L 138 9.365853658536565 z"
                              fill="rgba(22,189,202,1)"
                              fill-opacity="1"
                              stroke-opacity="1"
                              stroke-linecap="butt"
                              stroke-width="2"
                              stroke-dasharray="0"
                              class="apexcharts-pie-area apexcharts-donut-slice-0"
                              index="0"
                              j="0"
                              data:strokeWidth="2"
                              data:value="70"
                              data:pathOrig="M 138 9.365853658536565 A 128.63414634146343 128.63414634146343 0 1 1 15.661656903886822 177.7501372764262 L 58.48007698752643 163.837589229677 A 83.61219512195123 83.61219512195123 0 1 0 138 54.38780487804877 L 138 9.365853658536565 z"
                              stroke="#ffffff"
                            ></path>
                          </g>
                          <g
                            id="SvgjsG2856"
                            class="apexcharts-series apexcharts-pie-series"
                            seriesName="Tablet"
                            rel="2"
                            data:realIndex="1"
                          >
                            <path
                              id="SvgjsPath2857"
                              d="M 15.661656903886822 177.7501372764262 A 128.63414634146343 128.63414634146343 0 0 1 9.365853658536565 138.00000000000003 L 54.38780487804877 138 A 83.61219512195123 83.61219512195123 0 0 0 58.48007698752643 163.837589229677 L 15.661656903886822 177.7501372764262 z"
                              fill="rgba(253,186,140,1)"
                              fill-opacity="1"
                              stroke-opacity="1"
                              stroke-linecap="butt"
                              stroke-width="2"
                              stroke-dasharray="0"
                              class="apexcharts-pie-area apexcharts-donut-slice-1"
                              index="0"
                              j="1"
                              data:angle="18"
                              data:strokeWidth="2"
                              data:value="5"
                              data:pathOrig="M 15.661656903886822 177.7501372764262 A 128.63414634146343 128.63414634146343 0 0 1 9.365853658536565 138.00000000000003 L 54.38780487804877 138 A 83.61219512195123 83.61219512195123 0 0 0 58.48007698752643 163.837589229677 L 15.661656903886822 177.7501372764262 z"
                              stroke="#ffffff"
                            ></path>
                          </g>
                          <g
                            id="SvgjsG2858"
                            class="apexcharts-series apexcharts-pie-series"
                            seriesName="Phone"
                            rel="3"
                            data:realIndex="2"
                          >
                            <path
                              id="SvgjsPath2859"
                              d="M 9.365853658536565 138.00000000000003 A 128.63414634146343 128.63414634146343 0 0 1 137.97754910627245 9.365855617746632 L 137.9854069190771 54.387806151535315 A 83.61219512195123 83.61219512195123 0 0 0 54.38780487804877 138 L 9.365853658536565 138.00000000000003 z"
                              fill="rgba(26,86,219,1)"
                              fill-opacity="1"
                              stroke-opacity="1"
                              stroke-linecap="butt"
                              stroke-width="2"
                              stroke-dasharray="0"
                              class="apexcharts-pie-area apexcharts-donut-slice-2"
                              index="0"
                              j="2"
                              data:angle="90"
                              data:strokeWidth="2"
                              data:value="25"
                              data:pathOrig="M 9.365853658536565 138.00000000000003 A 128.63414634146343 128.63414634146343 0 0 1 137.97754910627245 9.365855617746632 L 137.9854069190771 54.387806151535315 A 83.61219512195123 83.61219512195123 0 0 0 54.38780487804877 138 L 9.365853658536565 138.00000000000003 z"
                              stroke="#ffffff"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                    <line
                      id="SvgjsLine2860"
                      x1="0"
                      y1="0"
                      x2="276"
                      y2="0"
                      stroke="#b6b6b6"
                      stroke-dasharray="0"
                      stroke-width="1"
                      stroke-linecap="butt"
                      class="apexcharts-ycrosshairs"
                    ></line>
                    <line
                      id="SvgjsLine2861"
                      x1="0"
                      y1="0"
                      x2="276"
                      y2="0"
                      stroke-dasharray="0"
                      stroke-width="0"
                      stroke-linecap="butt"
                      class="apexcharts-ycrosshairs-hidden"
                    ></line>
                  </g>
                  <g id="SvgjsG2847" class="apexcharts-annotations"></g>
                </svg>
                <div class="apexcharts-legend"></div>
                <div class="apexcharts-tooltip apexcharts-theme-dark">
                  <div
                    class="apexcharts-tooltip-series-group"
                    style="order: 3;"
                  >
                    <span
                      class="apexcharts-tooltip-marker"
                      style="background-color: rgb(22, 189, 202);"
                    ></span>
                    <div
                      class="apexcharts-tooltip-text"
                      style="font-family: Inter, sans-serif; font-size: 14px;"
                    >
                      <div class="apexcharts-tooltip-y-group">
                        <span class="apexcharts-tooltip-text-y-label"></span>
                        <span class="apexcharts-tooltip-text-y-value"></span>
                      </div>
                      <div class="apexcharts-tooltip-goals-group">
                        <span class="apexcharts-tooltip-text-goals-label"></span>
                        <span class="apexcharts-tooltip-text-goals-value"></span>
                      </div>
                      <div class="apexcharts-tooltip-z-group">
                        <span class="apexcharts-tooltip-text-z-label"></span>
                        <span class="apexcharts-tooltip-text-z-value"></span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="apexcharts-tooltip-series-group"
                    style="order: 2;"
                  >
                    <span
                      class="apexcharts-tooltip-marker"
                      style="background-color: rgb(253, 186, 140);"
                    ></span>
                    <div
                      class="apexcharts-tooltip-text"
                      style="font-family: Inter, sans-serif; font-size: 14px;"
                    >
                      <div class="apexcharts-tooltip-y-group">
                        <span class="apexcharts-tooltip-text-y-label"></span>
                        <span class="apexcharts-tooltip-text-y-value"></span>
                      </div>
                      <div class="apexcharts-tooltip-goals-group">
                        <span class="apexcharts-tooltip-text-goals-label"></span>
                        <span class="apexcharts-tooltip-text-goals-value"></span>
                      </div>
                      <div class="apexcharts-tooltip-z-group">
                        <span class="apexcharts-tooltip-text-z-label"></span>
                        <span class="apexcharts-tooltip-text-z-value"></span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="apexcharts-tooltip-series-group"
                    style="order: 1;"
                  >
                    <span
                      class="apexcharts-tooltip-marker"
                      style="background-color: rgb(26, 86, 219);"
                    ></span>
                    <div
                      class="apexcharts-tooltip-text"
                      style="font-family: Inter, sans-serif; font-size: 14px;"
                    >
                      <div class="apexcharts-tooltip-y-group">
                        <span class="apexcharts-tooltip-text-y-label"></span>
                        <span class="apexcharts-tooltip-text-y-value"></span>
                      </div>
                      <div class="apexcharts-tooltip-goals-group">
                        <span class="apexcharts-tooltip-text-goals-label"></span>
                        <span class="apexcharts-tooltip-text-goals-value"></span>
                      </div>
                      <div class="apexcharts-tooltip-z-group">
                        <span class="apexcharts-tooltip-text-z-label"></span>
                        <span class="apexcharts-tooltip-text-z-value"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-4 lg:justify-evenly sm:pt-6">
              <div>
                <svg
                  class="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
                  ></path>
                </svg>
                <h3 class="text-gray-500 dark:text-gray-400">Desktop</h3>
                <h4 class="text-xl font-bold dark:text-white">234k</h4>
                <p class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      ></path>
                    </svg>
                    4%
                  </span>
                  vs last month
                </p>
              </div>
              <div>
                <svg
                  class="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M8 16.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"></path>
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M4 4a3 3 0 013-3h6a3 3 0 013 3v12a3 3 0 01-3 3H7a3 3 0 01-3-3V4zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75V2.5h1A1.5 1.5 0 0114.5 4v12a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 16V4A1.5 1.5 0 017 2.5h1z"
                  ></path>
                </svg>
                <h3 class="text-gray-500 dark:text-gray-400">Phone</h3>
                <h4 class="text-xl font-bold dark:text-white">94k</h4>
                <p class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center mr-1.5 text-sm text-red-600 dark:text-red-500">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                      ></path>
                    </svg>
                    1%
                  </span>
                  vs last month
                </p>
              </div>
              <div>
                <svg
                  class="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M5 1a3 3 0 00-3 3v12a3 3 0 003 3h10a3 3 0 003-3V4a3 3 0 00-3-3H5zM3.5 4A1.5 1.5 0 015 2.5h10A1.5 1.5 0 0116.5 4v12a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 16V4zm5.25 11.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"
                  ></path>
                </svg>
                <h3 class="text-gray-500 dark:text-gray-400">Tablet</h3>
                <h4 class="text-xl font-bold dark:text-white">16k</h4>
                <p class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center mr-1.5 text-sm text-red-600 dark:text-red-500">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                      ></path>
                    </svg>
                    0,6%
                  </span>
                  vs last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Layout from "../../App_1";
import Nav from "./Nav";
import axios from "axios";
import { MomentDate } from "../../Utils/Functions";

export default function BulkUpdate() {
  const [state, setstate] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/rollover/get/new/${MomentDate()}`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const rollover_ = (e) => {
    axios
      .post(
        `http://localhost:5000/rollover/${e.target.getAttribute(
          "name"
        )}/${MomentDate()}`,
        {}
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Layout />
      <Nav />
      <div className="mx-8 mt-5">
        <div class="">
          <div class="">
            <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      description
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Summary
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Priority
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      start date
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      end date
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Start Time
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Task Recurrence
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Assign to User
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Assign to Department
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Escalated to User
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Escalated to Department
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Rollover
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.map((r) => (
                    <tr>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Short_description}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Summary}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Priority}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.start_date_time}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.end_date_time}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.start_time}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Task_Recurrence}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Assign_to_User}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Assign_to_Department}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Escalated_to_User}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Escalated_to_Department}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={rollover_}
                          name={r.ID}
                          class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        >
                          Action
                        </button>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={rollover_}
                          name={r.ID}
                          class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        >
                          Action
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

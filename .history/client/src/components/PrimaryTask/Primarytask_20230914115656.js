import React, { useState, useEffect } from "react";
import FilterableTable from "react-filterable-table";
import Layout from "../../App_1";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [state, setstate] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/PrimaryTasks`)
      .then((res) => {
        setstate(res.data);
        console.log(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const field = [
    Task_Date
    Task_Recurrence
    
    
    {
      name: "Short_description",
      displayName: "Short_description",
      inputFilterable: true,
      sortable: true,
    },
    {
      name: "Summary",
      displayName: "Summary",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Priority",
      displayName: "Priority",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Assign_to_User",
      displayName: "Assign_to_User",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Assign_to_Department",
      displayName: "Assign_to_Department",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Escalated_to_User",
      displayName: "Escalated_to_User",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Escalated_to_Department",
      displayName: "Escalated_to_Department",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "start_date_time",
      displayName: "start_date_time",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Escalated_to_Department",
      displayName: "Escalated_to_Department",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Escalated_to_Department",
      displayName: "Escalated_to_Department",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
  ];

  return (
    <>
      <Layout />
      <div>
        <div className="">
          <div className="">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
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
                    <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.map((r) => (
                    <tr>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.Short_description}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.Summary}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.Priority}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.start_date_time}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.end_date_time}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.Task_Recurrence}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.Assign_to_User}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.Assign_to_Department}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.Escalated_to_User}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {r.Escalated_to_Department}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-red text-sm">
                        <Link to={`/PrimaryTask/update/${r.ID}`}>Update</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

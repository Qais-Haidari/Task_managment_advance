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
    {
      name: "Short_description",
      displayName: "Desc",
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
      displayName: "Assign to User",
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
      name: "end_date_time",
      displayName: "end_date_time",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Task_Recurrence",
      displayName: "Task_Recurrence",
      inputFilterable: true,
      exactFilterable: true,
      sortable: true,
    },
    {
      name: "Task_Date",
      displayName: "Task_Date",
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
              <FilterableTable
                namespace="People"
                initialSort="name"
                data={state}
                fields={field}
                noRecordsMessage="There are no people to display"
                noFilteredRecordsMessage="No people match your filters!"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

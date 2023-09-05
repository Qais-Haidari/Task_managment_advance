import React, { useState, useEffect } from "react";
import Layout from "../../App_1";
import Nav from "./Nav";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [start_of_business, setstart_of_business] = useState("");
  const [end_of_business, setend_of_business] = useState("");

  const Name = (e) => setname(e.target.value);
  const Email = (e) => setemail(e.target.value);
  const st = (e) => setstart_of_business(e.target.value);
  const et = (e) => setend_of_business(e.target.value);

  const post = () => {
    if (!name || !email || !start_of_business || !end_of_business) {
      alert("Please Complete All Details");
    } else {
      Axios.post("http://10.0.0.112:5000/createDepartment", {
        ID: Math.floor(Math.random() * 1000),
        Department_ID: Math.floor(Math.random() * 1000),
        Department_Name: name,
        Email: email,
        Start_of_business: start_of_business,
        End_of_business: end_of_business,
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {});
    }
  };

  const [state, setState] = useState([]);
  useEffect(() => {
    Axios.get("http://10.0.0.112:5000/department")
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <Layout />
      <Nav />
      <div>
        <div className=" m-4 p-4 rounded overflow-hidden">
          <h1 className="text-lg font-bold mb-12 text-blue-700 text-center">
            Create Department
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2">
                Name
              </label>
              <input
                onChange={Name}
                className=" block w-full border rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2">
                Email
              </label>
              <input
                onChange={Email}
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2">
                Start of Business
              </label>
              <input
                onChange={st}
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2">
                End of Business
              </label>
              <input
                onChange={et}
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
              />
            </div>
          </div>
          <button
            onClick={post}
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
        <div class="container mx-auto px-4 sm:px-8">
          <div class="">
            <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Department ID
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Department Name
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Email
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      Start of Business
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                      End of business
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.map((r) => (
                    <tr>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Department_ID}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Department_Name}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Email}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.Start_of_Business}
                        </p>
                      </td>
                      <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {r.End_of_Business}
                        </p>
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

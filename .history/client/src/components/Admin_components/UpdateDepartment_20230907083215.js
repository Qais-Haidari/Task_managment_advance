import React, { useState, useEffect } from "react";
import Layout from "../../App_1";
import Nav from "./Nav";
import Axios from "axios";
import { useParams } from "react-router-dom";

export default function Admin() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [start_of_business, setstart_of_business] = useState("");
  const [end_of_business, setend_of_business] = useState("");

  const Name = (e) => setname(e.target.value);
  const Email = (e) => setemail(e.target.value);
  const st = (e) => setstart_of_business(e.target.value);
  const et = (e) => setend_of_business(e.target.value);

  const { id } = useParams();
  const [state, setState] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:5000/Departments/${id}`)
      .then((res) => {
        console.log(res.data);
        setname(res.data.name);
        setemail(res.data.Email);
        setstart_of_business(res.data.Start_of_Business);
        setend_of_business(res.data.End_of_Business);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  const post = () => {
    if (!name || !email || !start_of_business || !end_of_business) {
      alert("Please Complete All Details");
    } else {
      Axios.post("http://localhost:5000/createDepartment", {
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
  return (
    <>
      <Layout />
      <Nav />
      <div>
        <div className=" m-4 p-4 rounded overflow-hidden">
          <h1 className="text-lg font-bold mb-12 text-blue-700 text-center">
            Update Department
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2">
                Department Name
              </label>
              <input
                value={Name}
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
                value={state.Email}
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
                value={state.Start_of_Business}
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="time"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2">
                End of Business
              </label>
              <input
                onChange={et}
                value={state.End_of_Business}
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="time"
              />
            </div>
          </div>
          <button
            onClick={post}
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}

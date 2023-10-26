import React, { Fragment, useState, useEffect, useRef } from "react";
import Layout from "../../App_1";
import Nav from "./Nav";
import axios from "axios";
import TastAuth from "./TastAuth";
import moment from "moment";
import { Link } from "react-router-dom";
import { getCurrentDate, MomentDate } from "../../Utils/Functions";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Admin() {
  const [onceOFF, setonceOFF] = useState(false);

  // user and department fetch data
  const [UserFetch, setUserFetch] = useState([]);
  const [DepartmentFetch, setDepartmentFetch] = useState([]);
  const [UserAuth, setUserAuth] = useState([]);
  const [Type, setType] = useState("");
  const [Min, setMin] = useState("");
  const [Max, setMax] = useState("");
  const [Expected, setExpected] = useState("");
  const [Question, setQuestion] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked_, setIsChecked_] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleCheckboxChange_ = () => {
    setIsChecked_(!isChecked_);
  };
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [MoreReqs, setMoreReqs] = useState([]);

  const cancelButtonRef = useRef(null);
  const Type_ = (e) => setType(e.target.value);
  const Min_ = (e) => setMin(e.target.value);
  const Max_ = (e) => setMax(e.target.value);
  const Expected_ = (e) => setExpected(e.target.value);
  const Question_ = (e) => setQuestion(e.target.value);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/Departments`)
      .then((res) => {
        setDepartmentFetch(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://localhost:5000/Users`)
      .then((res) => {
        setUserFetch(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const More_ = () => {
    let MoreReq = [];

    console.log(
      !document.getElementById("Type").value,
      document.getElementById("Question").value === ""
    );

    // if (
    //   !document.getElementById("Type").value &&
    //   !document.getElementById("Question").value
    // ) {
    //   return;
    // } else {
    //   MoreReq.push({
    //     Type: document.getElementById("Type").value,
    //     Min: document.getElementById("Min").value,
    //     Max: document.getElementById("Max").value,
    //     Expected: document.getElementById("Expected").value,
    //     Question: document.getElementById("Question").value,
    //   });
    //   setMoreReqs((oldArray) => [...oldArray, MoreReq]);
    //   document.getElementById("MoreForm").reset();
    // }
  };

  const [Short_description, setShort_description] = useState("");
  const [Summary, setSummary] = useState("");
  const [Priority, setPriority] = useState("");
  const [ApproveBy, setApproveBy] = useState("");
  const [start_date_time, setstart_date_time] = useState("");
  const [UserDetail, setUserDetail] = useState("");
  const [Tast_duration, setTast_duration] = useState("");
  const [Assign_to_User, setAssign_to_User] = useState("");
  const [Assign_to_Department, setAssign_to_Department] = useState("");
  const [Escalated_to_User, setEscalated_to_User] = useState("");
  const [Escalated_to_Department, setEscalated_to_Department] = useState("");
  const [Email_Notify, setEmail_Notify] = useState(false);
  const [SMS_Notifiy, setSMS_Notifiy] = useState(false);
  const [Task_Recurrence, setTask_Recurrence] = useState("");
  const [TaskNumber, setTaskNumber] = useState(0);
  const [Monday, setMonday] = useState(false);
  const [Thuesday, setThuesday] = useState(false);
  const [Wednesday, setWednesday] = useState(false);
  const [Thuresday, setThuresday] = useState(false);
  const [Friday, setFriday] = useState(false);
  const [Saturday, setSaturday] = useState(false);
  const [Sunday, setSunday] = useState(false);

  const Short_description_ = (e) => setShort_description(e.target.value);
  const Summary_ = (e) => setSummary(e.target.value);
  const Priority_ = (e) => setPriority(e.target.value);
  const ApproveBy_ = (e) => setApproveBy(e.target.value);
  const start_date_time_ = (e) => {
    let a =
      moment(e.target.value).format("YYYY-MM-DD HH:mm:ss").split(" ")[0] +
      " " +
      new Date(e.target.value).toLocaleTimeString();
    setstart_date_time(a);
  };
  const Tast_duration_ = (e) => setTast_duration(e.target.value);
  const Email_Notify_ = (e) => {
    setEmail_Notify(e.target.checked);
  };
  const TaskNumber_ = (e) => setTaskNumber(e.target.value);
  const SMS_Notifiy_ = (e) => setSMS_Notifiy(e.target.checked);
  const Task_Recurrence_ = (e) => setTask_Recurrence(e.target.value);

  const Assign_to_User_ = (e) => {
    if (e.target.value) {
      axios
        .get(`http://localhost:5000/tasks/${e.target.value}`)
        .then((res) => {
          setUserAuth(res.data);
        })
        .catch((err) => (document.body.innerHTML = err));
      setAssign_to_User(e.target.value);
      axios
        .get(`http://localhost:5000/Users/${e.target.value}`)
        .then((res) => {
          setUserDetail(res.data);
        })
        .catch((err) => (document.body.innerHTML = err));
      setAssign_to_Department("");
    } else {
    }
  };
  const Assign_to_Department_ = (e) => {
    if (e.target.value) {
      axios
        .get(`http://localhost:5000/tasks2/${e.target.value}`)
        .then((res) => {
          setUserAuth(res.data);
        })
        .catch((err) => (document.body.innerHTML = err));
      setAssign_to_Department(e.target.value);
      setAssign_to_User("");
    } else {
    }
  };
  const Escalated_to_User_ = (e) => {
    if (e.target.value) {
      axios
        .get(`http://localhost:5000/tasks3/${e.target.value}`)
        .then((res) => {
          setUserAuth(res.data);
        })
        .catch((err) => (document.body.innerHTML = err));
      setEscalated_to_User(e.target.value);
      setEscalated_to_Department("");
    } else {
    }
  };
  const Escalated_to_Department_ = (e) => {
    if (e.target.value) {
      axios
        .get(`http://localhost:5000/tasks4/${e.target.value}`)
        .then((res) => {
          setUserAuth(res.data);
        })
        .catch((err) => (document.body.innerHTML = err));
      setEscalated_to_Department(e.target.value);
      setEscalated_to_User("");
    }
  };
  const Monday_ = (e) => setMonday(e.target.checked);
  const Thudesday_ = (e) => setThuesday(e.target.checked);
  const Wednesday_ = (e) => setWednesday(e.target.checked);
  const Thuresday_ = (e) => setThuresday(e.target.checked);
  const Friday_ = (e) => setFriday(e.target.checked);
  const Saturday_ = (e) => setSaturday(e.target.checked);
  const Sunday_ = (e) => setSunday(e.target.checked);

  const post = () => {
    if (
      !Short_description ||
      !Summary ||
      !Priority ||
      !start_date_time ||
      !Question ||
      ApproveBy === "Please Select User Who Approve This Task" ||
      !Type
    ) {
      setOpen(true);
    } else {
      axios
        .post("http://localhost:5000/createTask", {
          OnceOFF: onceOFF,
          Short_description: Short_description,
          Summary: Summary,
          Priority: Priority,
          start_date_time: start_date_time,
          TaskNumber: TaskNumber,
          Tast_duration: Tast_duration,
          Assign_to_User: Assign_to_User,
          Assign_to_Department: Assign_to_Department,
          Escalated_to_User: Escalated_to_User,
          Escalated_to_Department: Escalated_to_Department,
          Email_Notify: Email_Notify,
          SMS_Notifiy: SMS_Notifiy,
          Task_Recurrence: Task_Recurrence,
          Monday: Monday,
          Thuesday: Thuesday,
          Wednesday: Wednesday,
          Thudesday: Thuesday,
          Friday: Friday,
          Saturday: Saturday,
          Sunday: Sunday,
          Date: MomentDate(),
          // task auth
          Type: Type,
          MinValue: Min,
          MaxValue: Max,
          ExptectedValue: Expected,
          Questions: Question,
          User: Assign_to_User,
          Department: Assign_to_Department,
          EsUser: Escalated_to_User,
          EsDepartment: Escalated_to_Department,
          ApproveBy: ApproveBy,
        })
        .then((res) => {
          alert("Task Created");
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
        <h1 className="text-2xl mt-4 font-bold mb-12 text-blue-700 text-center">
          Create Task
        </h1>
        <div className="flex">
          <div className="mx-8 flex-1">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <div className="flex">
                  <label className="block capitalize tracking-wide text-blue-700 font-bold text-sm mt-3 mr-2">
                    Assign To
                  </label>
                  <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-green p-1">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isChecked_}
                      onChange={handleCheckboxChange_}
                    />
                    <span
                      className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                        !isChecked_
                          ? "text-white bg-blue-600"
                          : "text-body-color"
                      }`}
                    >
                      User
                    </span>
                    <span
                      className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                        isChecked_
                          ? "text-white bg-blue-600"
                          : "text-body-color"
                      }`}
                    >
                      Department
                    </span>
                  </label>
                </div>
                {isChecked_ === true ? (
                  <select
                    className=" mb-2 block appearance-none w-full bg-green border bg-green text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-green focus:border-gray-500"
                    id="grid-state"
                    onClick={Assign_to_Department_}
                  >
                    <option></option>
                    {DepartmentFetch.map((r) => (
                      <option>{r.Department_Name}</option>
                    ))}
                  </select>
                ) : (
                  <div>
                    <select
                      className="block appearance-none w-full bg-green border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-green focus:border-gray-500"
                      id="grid-state"
                      onClick={Assign_to_User_}
                    >
                      <option></option>
                      {UserFetch.map((r) => (
                        <option>{r.First_Name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <div className="flex">
                  <label className="block capitalize tracking-wide text-blue-700 font-bold text-sm mt-3 mr-2">
                    Escalated To
                  </label>
                  <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-green p-1">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <span
                      className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                        !isChecked
                          ? "text-white bg-blue-600"
                          : "text-body-color"
                      }`}
                    >
                      User
                    </span>
                    <span
                      className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                        isChecked ? "text-white bg-blue-600" : "text-body-color"
                      }`}
                    >
                      Department
                    </span>
                  </label>
                  <div>
                    <p className="ml-20 -mt-2 text-blue-600 font-bold">
                      Once Off
                    </p>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      onClick={() => {
                        if (onceOFF === false) {
                          setonceOFF(true);
                        } else {
                          setonceOFF(false);
                        }
                      }}
                      className={`${
                        enabled ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 ml-28 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable notifications</span>
                      <span
                        className={`${
                          enabled ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>
                </div>
                {isChecked === true ? (
                  <select
                    className="mb-2 block appearance-none w-full bg-green border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-green focus:border-gray-500"
                    id="grid-state"
                    onClick={Escalated_to_Department_}
                  >
                    <option></option>
                    {DepartmentFetch.map((r) => (
                      <option>{r.Department_Name}</option>
                    ))}
                  </select>
                ) : (
                  <div>
                    <select
                      className="block appearance-none w-full bg-green border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-green focus:border-gray-500"
                      id="grid-state"
                      onClick={Escalated_to_User_}
                    >
                      <option></option>
                      {UserFetch.map((r) => (
                        <option>{r.First_Name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-first-name"
                >
                  Short Description
                </label>
                <input
                  className=" block w-full  text-gray-700 border rounded py-2 px-2 mb-3 4 focus:outline-none focus:bg-green"
                  id="grid-first-name"
                  onChange={Short_description_}
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block capitalize  tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                >
                  Summary
                </label>
                <input
                  className="appearance-none block w-full bg-green text-gray-700 border border-gray-200 rounded py-2 px-2 4 focus:outline-none focus:bg-green focus:border-gray-500"
                  id="grid-last-name"
                  onChange={Summary_}
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                >
                  Notify By
                </label>
                <div className="flex">
                  <div className="ml-10 mt-2">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                      type="checkbox"
                      value=""
                      onClick={Email_Notify_}
                    />
                    <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                      Email
                    </label>
                  </div>
                  <div className="ml-10 mt-2">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                      type="checkbox"
                      value=""
                      onClick={SMS_Notifiy_}
                    />
                    <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                      SMS
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                >
                  Priority
                </label>
                <select
                  className="block appearance-none w-full bg-green border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-green focus:border-gray-500"
                  id="grid-state"
                  onClick={Priority_}
                >
                  <option>Please Select Priority</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <label
                  className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
                  for="grid-last-name"
                  id="Approveby"
                >
                  Approve By
                </label>
                <select
                  className="block appearance-none w-full bg-green border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-green focus:border-gray-500"
                  id="grid-state"
                  onClick={ApproveBy_}
                >
                  <option>Please Select User Who Approve This Task</option>
                  {UserFetch.map((r) => (
                    <option>{r.First_Name}</option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2 flex px-3">
                <div>
                  <p className="text-blue-700">Start date and time</p>
                  <input type="datetime-local" onChange={start_date_time_} />
                </div>
                <div className="ml-4 flex">
                  <input
                    type="number"
                    className="mt-6 h-10 w-16"
                    onChange={TaskNumber_}
                  />
                  <select className=" h-10 mt-6 ml-2" onClick={Tast_duration_}>
                    <option></option>
                    <option value="m">Min</option>
                    <option value="h">Hour</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <p className="text-blue-700 text-center">Task Recurrence</p>
                <select className="w-full" onChange={Task_Recurrence_}>
                  <option>None</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthy</option>
                </select>
              </div>
              {Task_Recurrence === "Daily" ? (
                <></>
              ) : (
                <div className="w-full md:w-1/2 px-3 mt-2">
                  <label
                    className="block capitalize tracking-wide text-blue-700 font-bold text-sm"
                    for="grid-last-name"
                  >
                    Select Days
                  </label>
                  <div className="flex">
                    <div className="ml-10 mt-2">
                      <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                        Mon
                      </label>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                        type="checkbox"
                        value=""
                        onClick={Monday_}
                      />
                    </div>
                    <div className="ml-10 mt-2">
                      <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                        Tue
                      </label>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                        type="checkbox"
                        value=""
                        onClick={Thudesday_}
                      />
                    </div>
                    <div className="ml-10 mt-2">
                      <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                        Wed
                      </label>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                        type="checkbox"
                        value=""
                        onClick={Wednesday_}
                      />
                    </div>
                    <div className="ml-10 mt-2">
                      <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                        Thu
                      </label>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                        type="checkbox"
                        value=""
                        onClick={Thuresday_}
                      />
                    </div>
                    <div className="ml-10 mt-2">
                      <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                        Fri
                      </label>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                        type="checkbox"
                        value=""
                        onClick={Friday_}
                      />
                    </div>
                    <div className="ml-10 mt-2">
                      <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                        Sat
                      </label>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                        type="checkbox"
                        value=""
                        onClick={Saturday_}
                      />
                    </div>
                    <div className="ml-10 mt-2">
                      <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                        Sun
                      </label>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                        type="checkbox"
                        value=""
                        onClick={Sunday_}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h1 className="text-center text-lg">Task Requirments</h1>
            <div className="flex flex-wrap px-3 mt-2 shadow-xl rounded pb-2">
              <div className="mr-2">
                <p className="mb-2">Type</p>
                <div className="text-xs">
                  <select
                    className="rounded-lg w-40 border-blue-600"
                    id="Type"
                    onChange={Type_}
                  >
                    <option>Please Select</option>
                    <option>Attachement</option>
                    <option>Value</option>
                    <option>Yes/NO</option>
                  </select>
                </div>
              </div>
              <div className="mr-2">
                <p className="mb-2">Min Value</p>
                <input
                  className="shadow appearance-none w-20 border rounded  py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                  id="Min"
                  type="text"
                  onChange={Min_}
                />
              </div>
              <div className="mr-2">
                <p className="mb-2">Max Value</p>
                <input
                  className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                  id="Max"
                  type="text"
                  onChange={Max_}
                />
              </div>
              <div className="mr-2">
                <p className="mb-2">Expected Value</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                  id="Expected"
                  type="text"
                  onChange={Expected_}
                  placeholder="Expected Value"
                />
              </div>
              <div className="mr-2">
                <p className="mb-2" id="questions">
                  Questions
                </p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                  id="Question"
                  type="text"
                  onChange={Question_}
                  placeholder="Questions"
                />
              </div>
              <button
                onClick={() => {
                  setOpens(true);
                }}
                className="bg-blue-500 text-white font-bold h-10 mt-8 py-2 px-4 rounded"
              >
                More
              </button>
            </div>
            <button
              onClick={post}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
          <div className="flex-1">
            <p>Start of Business: {UserDetail.Start_of_business}</p>
            <p>End of Business: {UserDetail.End_of_business}</p>
            <div className="w-full bg-green-600 border rounded-lg">
              {UserAuth.map((r) => (
                <div
                  className={`text-black border  m-4 rounded-md p-3 flex 
                ${r.Priority === "Low" ? " bg-gray-600" : "1"}
                ${r.Priority === "High" ? " bg-orange-600" : "2"}
                ${r.Priority === "Critical" ? " bg-red-600" : "13"}
                ${r.Priority === "Medium" ? " bg-yellow-300" : "14"}
                `}
                >
                  <div className="flex-1 text-white">
                    Description: {r.Short_description}
                  </div>
                  <div className="flex-1 text-white">Start: {r.start_time}</div>
                  <div className="flex-1 text-white">End: {r.end_time}</div>
                  <div className="flex-1 text-white">
                    Priority: {r.Priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <details className="group border p-3 mx-2 mt-2">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
            <span className="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
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
                        Tast duration
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
                    {UserAuth.map((r) => (
                      <tr>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Short_description}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Summary}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Priority}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.start_date_time}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.end_date_time}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Tast_duration}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Task_Recurrence}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Assign_to_User}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Assign_to_Department}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Escalated_to_User}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-green text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {r.Escalated_to_Department}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-red text-sm">
                          <Link to={`update/${r.ID}`}>Update</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </details>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <div className="mt-2">
                            {!Short_description ? (
                              <p className="text-sm text-red-600">
                                Short Description cant be empty
                              </p>
                            ) : (
                              <p className="text-sm text-red-600"></p>
                            )}
                            {!Summary ? (
                              <p className="text-sm text-red-600">
                                Short Description cant be empty
                              </p>
                            ) : (
                              <p className="text-sm text-red-600"></p>
                            )}
                            {!start_date_time ? (
                              <p className="text-sm text-red-600">
                                Start Date and Time cant be empty
                              </p>
                            ) : (
                              <p className="text-sm text-red-600"></p>
                            )}
                            {!Priority ? (
                              <p className="text-sm text-red-600">
                                Priority cant be empty
                              </p>
                            ) : (
                              <p className="text-sm text-red-600"></p>
                            )}
                            {!Type ? (
                              <p className="text-sm text-red-600">
                                Type cant be empty
                              </p>
                            ) : (
                              <p className="text-sm text-red-600"></p>
                            )}
                            {!ApproveBy ===
                            "Please Select User Who Approve This Task" ? (
                              <p className="text-sm text-red-600">
                                {ApproveBy}
                              </p>
                            ) : (
                              <p className="text-sm text-red-600"></p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={opens} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-full overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                      <form id="MoreForm">
                        <div className="flex flex-wrap px-3 mt-2 shadow-xl rounded pb-2">
                          <div className="mr-2">
                            <p className="mb-2">Type</p>
                            <div className="text-xs">
                              <select
                                className="rounded-lg w-40 border-blue-600"
                                id="Type"
                                onChange={Type_}
                              >
                                <option>Please Select</option>
                                <option>Attachement</option>
                                <option>Value</option>
                                <option>Yes/NO</option>
                              </select>
                            </div>
                          </div>
                          <div className="mr-2">
                            <p className="mb-2">Min Value</p>
                            <input
                              className="shadow appearance-none w-20 border rounded  py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                              id="Min"
                              type="text"
                              onChange={Min_}
                            />
                          </div>
                          <div className="mr-2">
                            <p className="mb-2">Max Value</p>
                            <input
                              className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                              id="Max"
                              type="text"
                              onChange={Max_}
                            />
                          </div>
                          <div className="mr-2">
                            <p className="mb-2">Expected Value</p>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                              id="Expected"
                              type="text"
                              onChange={Expected_}
                              placeholder="Expected Value"
                            />
                          </div>
                          <div className="mr-2">
                            <p className="mb-2" id="questions">
                              Questions
                            </p>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                              id="Question"
                              type="text"
                              onChange={Question_}
                              placeholder="Questions"
                            />
                          </div>
                          <div className="mt-9">
                            <button
                              type="button"
                              className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={More_}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </form>
                      <div className="mt-2">
                        {MoreReqs.map((r) => (
                          <div className="flex flex-row space-x-2">
                            <p className="text-red-600">
                              Type:{" "}
                              <span className="text-black">{r[0].Type}</span>
                            </p>
                            <p className="text-red-600">
                              Min:{" "}
                              <span className="text-black">{r[0].Min}</span>
                            </p>
                            <p className="text-red-600">
                              Max:{" "}
                              <span className="text-black">{r[0].Max}</span>
                            </p>
                            <p className="text-red-600">
                              Expected:{" "}
                              <span className="text-black">
                                {r[0].Expected}
                              </span>
                            </p>
                            <p className="text-red-600">
                              Question:{" "}
                              <span className="text-black">
                                {r[0].Question}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpens(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}

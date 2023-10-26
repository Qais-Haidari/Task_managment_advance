import React, { useState, useEffect } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MomentDate } from "../../Utils/Functions";

export default function Admin() {
  const [TaskAuth, setTaskAuth] = useState([]);
  // user and department fetch data
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked_, setIsChecked_] = useState(false);
  const [UserFetch, setUserFetch] = useState([]);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleCheckboxChange_ = () => {
    setIsChecked_(!isChecked_);
  };
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/PrimaryTasks/${id}`)
      .then((res) => {
        setID(res.data.ID);
        setShort_description(res.data.Short_description);
        setSummary(res.data.Summary);
        setPriority(res.data.Priority);
        setTast_duration(res.data.Tast_duration);
        setAssign_to_User(res.data.Assign_to_User);
        setAssign_to_Department(res.data.Assign_to_Department);
        setEscalated_to_User(res.data.Escalated_to_User);
        setEscalated_to_Department(res.data.Escalated_to_Department);
        setEmail_Notify(res.data.Email_Notify);
        setSMS_Notifiy(res.data.SMS_Notifiy);
        setTask_Recurrence(res.data.Task_Recurrence);
        setTaskNumber(res.data.TaskNumber);
        setMonday(res.data.Monday);
        setThuesday(res.data.Thuesday);
        setWednesday(res.data.Wednesday);
        setThuresday(res.data.Thuresday);
        setFriday(res.data.Friday);
        setSaturday(res.data.Saturday);
        setSunday(res.data.Sunday);
        setStartDate(res.data.start_date_time);
        setEndDate(res.data.end_date_time);
        setStartTime(res.data.start_time);
        setEndTime(res.data.end_time);
        setApproveBy(res.data.Approve_By);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://localhost:5000/Users`)
      .then((res) => {
        setUserFetch(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [ApproveBy, setApproveBy] = useState("");

  const [ID, setID] = useState("");
  const [Short_description, setShort_description] = useState("");
  const [Summary, setSummary] = useState("");
  const [Priority, setPriority] = useState("");
  const [Tast_duration, setTast_duration] = useState("");
  const [Assign_to_User, setAssign_to_User] = useState("");
  const [Assign_to_Department, setAssign_to_Department] = useState("");
  const [Escalated_to_User, setEscalated_to_User] = useState("");
  const [Escalated_to_Department, setEscalated_to_Department] = useState("");
  const [Email_Notify, setEmail_Notify] = useState("");
  const [SMS_Notifiy, setSMS_Notifiy] = useState("");
  const [Task_Recurrence, setTask_Recurrence] = useState("");
  const [TaskNumber, setTaskNumber] = useState(0);
  const [Monday, setMonday] = useState("");
  const [Thuesday, setThuesday] = useState("");
  const [Wednesday, setWednesday] = useState("");
  const [Thuresday, setThuresday] = useState("");
  const [Thudesday, setThudesday] = useState("");
  const [Friday, setFriday] = useState("");
  const [Saturday, setSaturday] = useState("");
  const [Sunday, setSunday] = useState("");

  const Monday_ = (e) => setMonday(e.target.checked);
  const Thudesday_ = (e) => setThudesday(e.target.checked);
  const Wednesday_ = (e) => setWednesday(e.target.checked);
  const Thuresday_ = (e) => setThuresday(e.target.checked);
  const Friday_ = (e) => setFriday(e.target.checked);
  const Saturday_ = (e) => setSaturday(e.target.checked);
  const Sunday_ = (e) => setSunday(e.target.checked);

  const Short_description_ = (e) => setShort_description(e.target.value);
  const Summary_ = (e) => setSummary(e.target.value);
  const Priority_ = (e) => setPriority(e.target.value);
  const Email_Notify_ = (e) => {
    setEmail_Notify(e.target.checked);
  };
  const SMS_Notifiy_ = (e) => setSMS_Notifiy(e.target.checked);
  const Task_Recurrence_ = (e) => setTask_Recurrence(e.target.value);

  const [Type, setType] = useState("");
  const [Min, setMin] = useState("");
  const [Max, setMax] = useState("");
  const [Expected, setExpected] = useState("");
  const [Question, setQuestion] = useState("");

  const Type_ = (e) => setType(e.target.value);
  const Min_ = (e) => setMin(e.target.value);
  const Max_ = (e) => setMax(e.target.value);
  const Expected_ = (e) => setExpected(e.target.value);
  const Question_ = (e) => setQuestion(e.target.value);

  const createTaskAuth = () => {
    if (!Question || !Type) {
      alert("Please Complete All Details");
    } else {
      axios
        .post("http://localhost:5000/Priamry/createTask", {
          Task_ID: ID,
          Type: Type,
          MinValue: Min,
          MaxValue: Max,
          ExptectedValue: Expected,
          Questions: Question,
          Date: MomentDate(),
          User: Assign_to_User || "",
          Department: Assign_to_Department || "",
          EsUser: Escalated_to_User || "",
          EsDepartment: Escalated_to_Department || "",
        })
        .then((res) => {
          alert("Task Auth Created");
          window.location.reload();
        })
        .catch((err) => {});
    }
  };

  const Assign_to_User_ = (e) => {
    if (e.target.value) {
      setAssign_to_User(e.target.value);
      setAssign_to_Department("");
    } else {
    }
  };
  const Assign_to_Department_ = (e) => {
    if (e.target.value) {
      setAssign_to_Department(e.target.value);
      setAssign_to_User("");
    } else {
    }
  };
  const Escalated_to_User_ = (e) => {
    if (e.target.value) {
      setEscalated_to_User(e.target.value);
      setEscalated_to_Department("");
    } else {
    }
  };
  const Escalated_to_Department_ = (e) => {
    if (e.target.value) {
      setEscalated_to_Department(e.target.value);
      setEscalated_to_User("");
    }
  };
  const delete_ = () => {
    // ${id}
    axios
      .post(`http://localhost:5000/DeletePrimaryTask/${id}`, {
        Short_description: Short_description,
      })
      .then((res) => {
        alert("Deleted");
      })
      .catch((err) => {});
  };
  const post = () => {
    axios
      .post(`http://localhost:5000/PrimaryTask/update/${id}`, {
        Short_description: Short_description,
        Summary: Summary,
        Priority: Priority,
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
        StartDate: StartDate,
        EndDate: EndDate,
        StartTime: StartTime,
        EndTime: EndTime,
      })
      .then((res) => {
        alert("Update");
        window.location.reload();
      })
      .catch((err) => {});
  };

  const Click_ = () => {
    axios
      .get(`http://localhost:5000/PrimaryTasks/Auth/${ID}`)
      .then((res) => {
        setTaskAuth(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  };

  return (
    <>
      <Layout />
      <div>
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
                      className="sr-only bg-green"
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
                  <input
                    className=" block w-full bg-green text-gray-700 border rounded py-2 px-2 mb-3 4 focus:outline-none focus:bg-green"
                    onChange={Assign_to_Department_}
                    value={Assign_to_Department}
                  />
                ) : (
                  <div>
                    <input
                      className=" block w-full bg-green text-gray-700 border rounded py-2 px-2 mb-3 4 focus:outline-none focus:bg-green"
                      onChange={Assign_to_User_}
                      value={Assign_to_User}
                    />
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
                </div>
                {isChecked === true ? (
                  <input
                    className=" block w-full bg-green text-gray-700 border rounded py-2 px-2 mb-3 4 focus:outline-none focus:bg-green"
                    onChange={Escalated_to_Department_}
                    value={Escalated_to_Department}
                  />
                ) : (
                  <div>
                    <input
                      className=" block w-full bg-green text-gray-700 border rounded py-2 px-2 mb-3 4 focus:outline-none focus:bg-green"
                      onChange={Escalated_to_User_}
                      value={Escalated_to_User}
                    />
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
                  className=" block w-full bg-green text-gray-700 border rounded py-2 px-2 mb-3 4 focus:outline-none focus:bg-green"
                  id="grid-first-name"
                  onChange={Short_description_}
                  value={Short_description}
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
                  className="appearance-none block w-full bg-green text-gray-700 border  rounded py-2 px-2 4 focus:outline-none focus:bg-green focus:border-gray-500"
                  id="grid-last-name"
                  onChange={Summary_}
                  value={Summary}
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
                      value={Email_Notify}
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
                      value={SMS_Notifiy}
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
                  className="block appearance-none w-full bg-green border  text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-green focus:border-gray-500"
                  id="grid-state"
                  value={Priority}
                  onClick={Priority_}
                >
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 flex px-3">
                <div>
                  <p className="text-blue-700">Start date</p>
                  <input
                    type="text"
                    value={StartDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-blue-700">End date</p>
                  <input
                    type="text"
                    value={EndDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-blue-700">Start Time</p>
                  <input
                    type="text"
                    value={StartTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-blue-700">End Time</p>
                  <input
                    type="text"
                    value={EndTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <p className="text-blue-700 text-center">Task Recurrence</p>
                <select
                  className="w-full"
                  value={Task_Recurrence}
                  onChange={Task_Recurrence_}
                >
                  <option>None</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthy</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <p className="text-blue-700 text-center">
                  Approve By: {ApproveBy}
                </p>
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
                      checked={Monday}
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
                      checked={Thudesday}
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
                      checked={Wednesday}
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
                      checked={Thuresday}
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
                      checked={Friday}
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
                      checked={Saturday}
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
                      checked={Sunday}
                      onClick={Sunday_}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={post}
              className="bg-blue-500 mt-2 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
            <button
              onClick={delete_}
              className=" bg-red-600 mt-2 ml-2 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mx-8">
          <div class="py-5">
            <details class="group border p-3 delay-150 ">
              <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                <span className=" text-green-600 text-xl">
                  Create Task Auth
                </span>
                <span class="transition group-open:rotate-180">
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
              <div className="w-full flex flex-wrap px-5 mt-2 shadow-xl rounded pb-2">
                <div className="mr-2">
                  <p className="mb-2">Type</p>
                  <div className="text-xs ">
                    <select
                      className="rounded-lg border-blue-600"
                      id="Type"
                      onChange={Type_}
                    >
                      <option></option>
                      <option>Attachement</option>
                      <option>Value</option>
                      <option>Yes/NO</option>
                    </select>
                  </div>
                </div>
                <div className="mr-2">
                  <p className="mb-2">Min Value</p>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                    id="Min"
                    type="text"
                    onChange={Min_}
                    placeholder="Min Value"
                  />
                </div>
                <div className="mr-2">
                  <p className="mb-2">Max Value</p>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                    id="Max"
                    type="text"
                    onChange={Max_}
                    placeholder="Max Value"
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
                  <p className="mb-2">Questions</p>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                    id="Question"
                    type="text"
                    onChange={Question_}
                    placeholder="Questions"
                  />
                </div>
                <div className="mr-2">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 "
                    onClick={createTaskAuth}
                  >
                    Create
                  </button>
                </div>
              </div>
            </details>
          </div>
          <div class="-mt-5">
            <details class="group border p-3">
              <summary
                class="flex justify-between items-center font-medium cursor-pointer list-none"
                onClick={Click_}
              >
                <span className="text-green-600 text-xl">Task Auth List</span>
                <span class="transition group-open:rotate-180">
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
              <div class="container mx-auto px-4 sm:px-8">
                <div class="">
                  <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th class="px-5 py-3 border-b-2   text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                            Type
                          </th>
                          <th class="px-5 py-3 border-b-2   text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                            MaxValue
                          </th>
                          <th class="px-5 py-3 border-b-2   text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                            MinValue
                          </th>
                          <th class="px-5 py-3 border-b-2   text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                            Exptected Value
                          </th>
                          <th class="px-5 py-3 border-b-2   text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                            Questions
                          </th>
                          <th class="px-5 py-3 border-b-2   text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                            Questions
                          </th>
                          <th class="px-5 py-3 border-b-2   text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                            Update
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {TaskAuth.map((r) => (
                          <tr>
                            <td class="px-5 py-2 border-b  bg-green text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {r.Type}
                              </p>
                            </td>
                            <td class="px-5 py-2 border-b  bg-green text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {r.MaxValue}
                              </p>
                            </td>
                            <td class="px-5 py-2 border-b  bg-green text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {r.MinValue}
                              </p>
                            </td>
                            <td class="px-5 py-2 border-b  bg-green text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {r.ExptectedValue}
                              </p>
                            </td>
                            <td class="px-5 py-2 border-b  bg-green text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {r.Questions}
                              </p>
                            </td>
                            <td className="px-5 py-2 border-b  bg-red text-sm">
                              <Link to={`/PrimaryTaskAuth/update/${r.ID}`}>
                                Update
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}

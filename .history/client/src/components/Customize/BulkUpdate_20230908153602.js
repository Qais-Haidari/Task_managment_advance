import React, { useEffect, useState } from "react";
import Layout from "../../App_1";
import Nav from "./Nav";
import axios from "axios";

export default function BulkUpdate() {
  const [state, setstate] = useState([]);

  useEffect(() => {
    axios
      .get(`http://10.0.0.112:5000/task_`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const Update = () => {
    let IDs = document.getElementsByClassName("Check");
    const arr = [...IDs].map((input) => {
      let a;
      if (input.checked === true) {
        a = input.value;
      }
      return a;
    });
    axios
      .post(`http://10.0.0.112:5000/BuldUpdate`, {
        IDs: arr,
        Short_description: Short_description,
        Summary: Summary,
        Priority: Priority,
        start_date_time: start_date_time,
        end_date_time: end_date_time,
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
      })
      .then((res) => {})
      .catch((err) => {});
    window.location.reload();
  };
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

  const Type_ = (e) => setType(e.target.value);
  const Min_ = (e) => setMin(e.target.value);
  const Max_ = (e) => setMax(e.target.value);
  const Expected_ = (e) => setExpected(e.target.value);
  const Question_ = (e) => setQuestion(e.target.value);
  useEffect(() => {
    axios
      .get(`http://10.0.0.112:5000/Departments`)
      .then((res) => {
        setDepartmentFetch(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://10.0.0.112:5000/Users`)
      .then((res) => {
        setUserFetch(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const [Short_description, setShort_description] = useState("");
  const [Summary, setSummary] = useState("");
  const [Priority, setPriority] = useState("");
  const [start_date_time, setstart_date_time] = useState("");
  const [end_date_time, setend_date_time] = useState("");
  const [Tast_duration, setTast_duration] = useState("");
  const [Assign_to_User, setAssign_to_User] = useState("");
  const [Assign_to_Department, setAssign_to_Department] = useState("");
  const [Escalated_to_User, setEscalated_to_User] = useState("");
  const [Escalated_to_Department, setEscalated_to_Department] = useState("");
  const [Email_Notify, setEmail_Notify] = useState("");
  const [SMS_Notifiy, setSMS_Notifiy] = useState("");
  const [Task_Recurrence, setTask_Recurrence] = useState("");
  const [Monday, setMonday] = useState("");
  const [Thuesday, setThuesday] = useState("");
  const [Wednesday, setWednesday] = useState("");
  const [Thuresday, setThuresday] = useState("");
  const [Friday, setFriday] = useState("");
  const [Saturday, setSaturday] = useState("");
  const [Sunday, setSunday] = useState("");

  const Short_description_ = (e) => setShort_description(e.target.value);
  const Summary_ = (e) => setSummary(e.target.value);
  const Priority_ = (e) => setPriority(e.target.value);
  const start_date_time_ = (e) => setstart_date_time(e.target.value);
  const end_date_time_ = (e) => setend_date_time(e.target.value);
  const Tast_duration_ = (e) => setTast_duration(e.target.value);
  const Email_Notify_ = (e) => {
    setEmail_Notify(e.target.checked);
  };
  const SMS_Notifiy_ = (e) => setSMS_Notifiy(e.target.checked);
  const Task_Recurrence_ = (e) => setTask_Recurrence(e.target.value);

  const Assign_to_User_ = (e) => {
    axios
      .get(`http://10.0.0.112:5000/tasks/${e.target.value}`)
      .then((res) => {
        setUserAuth(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    setAssign_to_User(e.target.value);
  };
  const Assign_to_Department_ = (e) => setAssign_to_Department(e.target.value);
  const Escalated_to_User_ = (e) => setEscalated_to_User(e.target.value);
  const Escalated_to_Department_ = (e) =>
    setEscalated_to_Department(e.target.value);
  const Monday_ = (e) => setMonday(e.target.checked);
  const Thudesday_ = (e) => setThuesday(e.target.checked);
  const Wednesday_ = (e) => setWednesday(e.target.checked);
  const Thuresday_ = (e) => setThuresday(e.target.checked);
  const Friday_ = (e) => setFriday(e.target.checked);
  const Saturday_ = (e) => setSaturday(e.target.checked);
  const Sunday_ = (e) => setSunday(e.target.checked);

  return (
    <div>
      <Layout />
      <Nav />

      <div className="mx-8">
        <h1 className="text-2xl mt-4 font-bold mb-12 text-blue-700 text-center">
          Create Task
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block capitalize tracking-wide text-blue-700 font-bold text-sm mb-2"
              for="grid-first-name"
            >
              Short Description
            </label>
            <input
              className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-2 mb-3 4 focus:outline-none focus:bg-white"
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 4 focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              onChange={Summary_}
              type="text"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <select
              className="mb-2 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              onClick={Escalated_to_User_}
            >
              {DepartmentFetch.map((r) => (
                <option>{r.Department_Name}</option>
              ))}
            </select>
            <div>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onClick={Escalated_to_Department_}
              >
                {UserFetch.map((r) => (
                  <option>{r.First_Name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <select
              className=" mb-2 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              onClick={Assign_to_Department_}
            >
              {DepartmentFetch.map((r) => (
                <option>{r.Department_Name}</option>
              ))}
            </select>
            <div>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onClick={Assign_to_User_}
              >
                {UserFetch.map((r) => (
                  <option>{r.First_Name}</option>
                ))}
              </select>
            </div>
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
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded 4 focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
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
              <p className="text-blue-700">Start date and time</p>
              <input type="datetime-local" onChange={start_date_time_} />
            </div>
            <div className="ml-2">
              <p className="text-blue-700">End date and time</p>
              <input type="datetime-local" onClick={end_date_time_} />
            </div>
            <div className="ml-4">
              <p>Duration</p>
              <select className="" onClick={Tast_duration_}>
                <option>5 Min</option>
                <option>10 Min</option>
                <option>15 Min</option>
                <option>1 Hour</option>
                <option>2 Hour</option>
                <option>4 Hour</option>
                <option>6 Hour</option>
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
        </div>
      </div>
      <button
        class=" bg-green-700 text-sm ml-5 text-white py-2 px-3 rounded"
        type="button"
        onClick={Update}
      >
        Update
      </button>

      <div class="">
        <div class="">
          <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider"></th>
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
                    Tast duration
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Task Recurrence
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Assign to_User
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
                </tr>
              </thead>
              <tbody>
                {state.map((r) => (
                  <tr>
                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <input type="checkbox" className="Check" value={r.ID} />
                    </td>
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
                        {r.Tast_duration}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

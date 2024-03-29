import React, {useEffect} from "react";
import Layout from "../App_1";
import axios from 'axios'

export default function Profile() {
  const Login = () => {
    localStorage.removeItem("Status");
    localStorage.removeItem("ID");
    localStorage.removeItem("First_Name");
    localStorage.removeItem("Last_Name");
    localStorage.removeItem("Email");
    localStorage.removeItem("Phone");
    localStorage.removeItem("Start_of_business");
    localStorage.removeItem("End_of_business");
    localStorage.removeItem("Is_Admin");
    window.location.reload();
  };
  useEffect(() => {
    if (localStorage.getItem("Status") === 'true') {
      document.getElementById('usertoggle').setAttribute('checked', true)
    }
    if (localStorage.getItem("Status") === 'false'){
      document.getElementById('usertoggle').removeAttribute('checked')
    }
  }, []);
  const Update = () => {
    let status;
    if (document.getElementById('usertoggle').getAttribute('checked') == null) {
      status = true;
    }else {
      status = false;
    }
    axios
      .post(`http://10.0.0.116:5000/User/update/${localStorage.getItem("ID")}/${status}`)
      .then((res) => {
        Login()
      })
      .catch((err) => {});
  };
  return (
    <>
      <Layout />
      <div className="">
        <div className=" mx-10 mt-16 shadow-xl rounded-lg text-white bg-gray-900">
          <button
            onClick={Login}
            className="bg-blue-500 mb-5 hover:bg-blue-700  text-left text-white font-bold py-2 ml-2 px-4 rounded"
          >
            Logout
          </button>
          
          <label className="relative ml-2 mt-4 inline-flex items-center cursor-pointer">
            <input type="checkbox" id="usertoggle" onClick={Update} className="sr-only peer" />
            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">{ localStorage.getItem('Status') === 'true' ? 'Active' : 'In Active' }</span>
          </label>

          <div className="text-center text-xl mt-2">
            <h2 className="font-semibold">{localStorage.getItem("First_Name")}</h2>
          </div>
          <div className=" p-3 shadow-sm rounded-sm">
            <div className="text-white">
              <div className="grid md:grid-cols-2 text-md">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">User ID</div>
                  <div className="px-4 py-2">{localStorage.getItem("ID")}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">User Status</div>
                  <div className="px-4 py-2">{localStorage.getItem("Status")}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">First Name</div>
                  <div className="px-4 py-2">
                    {localStorage.getItem("First_Name")}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">2IC</div>
                  <div className="px-4 py-2">
                    {localStorage.getItem("IC")}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">Last Name</div>
                  <div className="px-4 py-2">
                    {localStorage.getItem("Last_Name")}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">Email</div>
                  <div className="px-4 py-2 sm:break-words">
                    {localStorage.getItem("Email")}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">Phone</div>
                  <div className="px-4 py-2">{localStorage.getItem("Phone")}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">Start of Business</div>
                  <div className="px-4 py-2">
                    {localStorage.getItem("Start_of_business")}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">End Of Business</div>
                  <div className="px-4 py-2">
                    {localStorage.getItem("End_of_business")}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">Authorization Level</div>
                  <div className="px-4 py-2">
                    {localStorage.getItem("Level")}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-red-600">Is Admin</div>
                  <div className="px-4 py-2">
                    <div className="text-white">
                      {localStorage.getItem("Is_Admin") === true ? "No" : "Yes"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

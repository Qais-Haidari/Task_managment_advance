import React from "react";
import Layout from "../App_1";

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
  return (
    <>
      <Layout />
      <div className="">
        <div class=" mx-10 mt-16 bg-white shadow-xl rounded-lg text-gray-900">
          <button
            onClick={Login}
            class="bg-blue-500 mb-5 hover:bg-blue-700  text-left text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
          <div class="text-center mt-2">
            <h2 class="font-semibold">{localStorage.getItem("First_Name")}</h2>
          </div>
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="text-gray-700">
              <div class="grid md:grid-cols-2 text-sm">
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">User ID</div>
                  <div class="px-4 py-2">{localStorage.getItem("ID")}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">First Name</div>
                  <div class="px-4 py-2">
                    {localStorage.getItem("First_Name")}
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Last Name</div>
                  <div class="px-4 py-2">
                    {localStorage.getItem("Last_Name")}
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Email</div>
                  <div class="px-4 py-2 sm:wra">{localStorage.getItem("Email")}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Phone</div>
                  <div class="px-4 py-2">{localStorage.getItem("Phone")}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Start of Business</div>
                  <div class="px-4 py-2">
                    {localStorage.getItem("Start_of_business")}
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">End Of Business</div>
                  <div class="px-4 py-2">
                    {localStorage.getItem("End_of_business")}
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Is Admin</div>
                  <div class="px-4 py-2">
                    <div class="text-blue-800">
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

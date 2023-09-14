import React from "react";
import App from "./App_1";

export default function Mainpage() {
  return (
    <div>
      <App />
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
              <div class="px-4 py-2">{localStorage.getItem("First_Name")}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Last Name</div>
              <div class="px-4 py-2">{localStorage.getItem("Last_Name")}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Email</div>
              <div class="px-4 py-2 sm:break-words">
                {localStorage.getItem("Email")}
              </div>
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
  );
}

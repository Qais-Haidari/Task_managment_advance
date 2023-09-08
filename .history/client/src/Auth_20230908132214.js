import Axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

export default function Auth() {
  const [state, setstate] = useState([]);
  const [UserDetail, setUserDetail] = useState("");
  useEffect(() => {
    Axios.get("http://10.0.0.112:5000/Users")
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const GetDetail = (e) => {
    console.log(e.target.value);
    // Axios.get("http://10.0.0.112:5000/Userslogin/" + e.target.value)
    //   .then((res) => {
    //     setUserDetail(res.data);
    //   })
    //   .catch((err) => (document.body.innerHTML = err));
  };

  const keyUP = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  // const Login = () => {
  //   if (!UserDetail) {
  //     alert("please select your User Name");
  //   } else {
  //     localStorage.setItem("Status", UserDetail.Status);
  //     localStorage.setItem("ID", UserDetail.ID);
  //     localStorage.setItem("First_Name", UserDetail.First_Name);
  //     localStorage.setItem("Last_Name", UserDetail.Last_Name);
  //     localStorage.setItem("Email", UserDetail.Email);
  //     localStorage.setItem("Phone", UserDetail.Phone);
  //     localStorage.setItem("Start_of_business", UserDetail.Start_of_business);
  //     localStorage.setItem("End_of_business", UserDetail.End_of_business);
  //     localStorage.setItem("Is_Admin", UserDetail.Is_Admin);
  //     localStorage.setItem("Department", UserDetail.Departments);
  //     localStorage.setItem("DepartmentAdmin", UserDetail.DepartmentsAdmin);
  //     window.location.reload();
  //   }
  // };
  return (
    <div className="">
      <div class="text-center mt-10">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-lg text-green-600 font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            type="text"
            placeholder="Search Username"
            onKeyUp={keyUP}
            id="myInput"
            className="bg-gray-50 border w-26 m-auto border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <ul
            id="myUL"
            className="max-w-xs flex flex-col m-auto mt-2"
            onClick={GetDetail}
          >
            {state.map((r) => (
              <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <a href="#" onClick={UserDetail}>
                  {r.First_Name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="text-center w-full"></div>
      </div>
    </div>
  );
}

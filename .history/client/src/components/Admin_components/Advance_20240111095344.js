import React, { useEffect, useState } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";
import ScreemUser from "../AdvanceDashboard/User";
import ScreenEXUser from "../AdvanceDashboard/EXUser";
import ScreemDepartment from "../AdvanceDashboard/Department";
import ScreemEXDepartment from "../AdvanceDashboard/EXDepartment";

export default function Tasklist() {
  const [User, setUser] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [ExUser, setExUser] = useState([]);
  const [EXDepartment, setEXDepartment] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/advancedashboard/${MomentDate()}`)
      .then((res) => {
        let AssToUser = [];
        let AssToDep = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Assign_to_User) {
            AssToUser.push({
              Name: res.data[i].Assign_to_User,
            });
          }
        }
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Assign_to_Department) {
            AssToDep.push({
              Name: res.data[i].Assign_to_Department,
            });
          }
        }

        var uniUser = [];
        AssToUser.filter((item) => {
          if (!uniUser.includes(item.Name)) {
            uniUser.push(item.Name);
          }
          return true;
        });

        var uniDep = [];
        AssToUser.filter((item) => {
          if (!uniDep.includes(item.Name)) {
            uniDep.push(item.Name);
          }
          return true;
        });
        setUser(uniUser);
        setDepartment(uniDep);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/task/dashboard/Escalated/${MomentDate()}/${getCurrentTimeDashboard()}`
      )
      .then((res) => {
        let AssToEXUser = [];
        let AssToEXDep = [];

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Escalated_to_User) {
            AssToEXUser.push({
              Name: res.data[i].Escalated_to_User,
            });
          }
        }
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Escalated_to_Department) {
            AssToEXDep.push({
              Name: res.data[i].Escalated_to_Department,
            });
          }
        }

        var uniEXUser = [];
        AssToEXUser.filter((item) => {
          if (!uniEXUser.includes(item.Name)) {
            uniEXUser.push(item.Name);
          }
          return true;
        });
        var uniEXDep = [];
        AssToEXDep.filter((item) => {
          if (!uniEXDep.includes(item.Name)) {
            uniEXDep.push(item.Name);
          }
          return true;
        });
        setExUser(uniEXUser);
        setEXDepartment(uniEXDep);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <Layout />
      <div></div>
      <section class="antialiased  text-white mt-1 px-2 rounded-md">
        <div class="flex flex-col">
          <div class="w-full bg-gray-900 shadow-lg rounded-sm border">
            <div class="p-3">
              <div class="overflow-x-auto">
                <h1 className=" text-red-600">User</h1>
                {User.map((r, index) => (
                  <ScreemUser User={User[index]} />
                ))}
                <h1 className=" text-red-600">Department</h1>
                {Department.map((r, index) => (
                  <ScreemDepartment Department={Department[index]} />
                ))}
                <h1 className=" text-red-600">Escalated User</h1>
                {ExUser.map((r, index) => (
                  <ScreenEXUser ExUser={ExUser[index]} />
                ))}
                <h1 className=" text-red-600">Escalated Department</h1>
                {EXDepartment.map((r, index) => (
                  <ScreemEXDepartment EXDepartment={EXDepartment[index]} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

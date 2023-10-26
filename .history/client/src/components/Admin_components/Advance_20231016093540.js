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
        let uniUser = AssToUser.map((e) => e["Count"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((obj) => AssToUser[obj])
          .map((e) => AssToUser[e]);

        let uniDep = AssToDep.map((e) => e["Count"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((obj) => AssToDep[obj])
          .map((e) => AssToDep[e]);

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
        let uniEXUser = AssToEXUser.map((e) => e["Count"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((obj) => AssToEXUser[obj])
          .map((e) => AssToEXUser[e]);

        let uniEXDep = AssToEXDep.map((e) => e["Count"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((obj) => AssToEXDep[obj])
          .map((e) => AssToEXDep[e]);
        setExUser(uniEXUser);
        setEXDepartment(uniEXDep);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
    
      <Layout />
      <section class="antialiased  text-gray-600 mt-1 px-2 rounded-md">
        <div class="flex flex-col">
          <div class="w-full bg-white shadow-lg rounded-sm border">
            <div class="p-3">
              <div class="overflow-x-auto"></div>
      {User.map((r) => (
        <ScreemUser User={User} />
      ))}
      {/* {Department.map((r) => (
        <ScreemDepartment Department={Department} />
      ))}
      {ExUser.map((r) => (
        <ScreenEXUser EXUser={ExUser} />
      ))}
      {EXDepartment.map((r) => (
        <ScreemEXDepartment EXDepartment={EXDepartment} />
      ))} */}
    </>
  );
}

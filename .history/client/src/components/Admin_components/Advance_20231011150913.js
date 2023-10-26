import React, { useEffect, useState } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";
import Item from "../AdvanceDashboard/Item";

export default function Tasklist() {
  const [User, setUser] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [ExUser, setExUser] = useState([]);
  const [EXDepartment, setEXDepartment] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/advancedashboard/${MomentDate()}`)
      .then((res) => {
        setunAction(res.data);
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
        console.log(uniDep);
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
        console.log(uniEXDep);
        console.log(uniEXUser);
        // setEscalated(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <Layout />
      <Item User={} />
    </>
  );
}

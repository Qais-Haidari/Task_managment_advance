import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";

import Leaderboard from "./components/Leaderboard";
import Dashboard from "./components/dashbaord";
import MonitorDashboard from "./components/MonitorDashboard";
import Chat from "./components/Chat";
import Tasklist from "./components/Tasklist";
import Profile from "./components/Profile";
import Login from "./Auth";
import Report from "./components/Report";
import Countdown from "./components/Countdown";
import Apps from "./App_1";
import MainPage from "./Mainpage";
import Admin from "./components/Admin";
// Admin Components
import CreateDepartment from "./components/Admin_components/createDepartment";
import UpdateDepartment from "./components/Admin_components/UpdateDepartment";
import CreateUser from "./components/Admin_components/createUser";
import UpdateUser from "./components/Admin_components/UpdateUser";
import CreateTask from "./components/Admin_components/createTask";
import UpdateTask from "./components/Admin_components/UpdateTask";
import Viewtask from "./components/Viewtask";
import Customize from "./components/Customize";

// Customize Components
import BulkUpdate from "./components/Customize/BulkUpdate";
import OldTask from "./components/Customize/Oldtask";
import TaskTimeManagment from "./components/Customize/TaskTimeManagment";

// Primary Tasks
import Primarytask from "./components/PrimaryTask/Primarytask";
import PrimarytaskUpdate from "./components/PrimaryTask/PrimaryTaskUpdate";
import PrimaryTaskAuthUpdate from "./components/PrimaryTask/PrimaryTaskAuthUpdate";
import Advance from "./components/Admin_components/Advance";

export default function App() {
  if (localStorage.getItem("ID")) {
    if(localStorage.getItem('Level') === '1'){

    }
  } else {
    return <Login />;
  }
}

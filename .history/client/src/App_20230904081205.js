import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import Apps from "./App_1";
import Admin from "./components/Admin";
import Leaderboard from "./components/Leaderboard";
import Dashboard from "./components/dashbaord";
import Chat from "./components/Chat";
import Tasklist from "./components/Tasklist";
import Profile from "./components/Profile";
import Login from "./Auth";
import Report from "./components/Report";
import Countdown from "./components/Countdown";

// Admin Components
import CreateDepartment from "./components/Admin_components/createDepartment";
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

export default function App() {
  if (localStorage.getItem("ID")) {
    return (
      <div className="">
        <Routes>
          <Route path="/" element={<Apps />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/tasklist" element={<Tasklist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewtask/:TaskID" element={<Viewtask />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Customize" element={<Customize />} />
          <Route path="/Countdown" element={<Countdown />} />

          {/* Admin Components Link */}
          <Route path="/createDepartment" element={<CreateDepartment />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/createTask/update/:id" element={<UpdateTask />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/createUser" element={<CreateUser />} />

          {/* CUstomise components Link */}
          <Route path="/Customize/BulkUpdate" element={<BulkUpdate />} />
          <Route path="/Customize/OldTask" element={<OldTask />} />
          <Route path="/tasktimemanagment" element={<TaskTimeManagment />} />

          {/* Primary Tasks */}
          <Route path="/PrimaryTask" element={<Primarytask />} />
          <Route
            path="/PrimaryTask/update/:id"
            element={<PrimarytaskUpdate />}
          />
          <Route
            path="/PrimaryTaskAuth/update/:id"
            element={<PrimaryTaskAuthUpdate />}
          />
        </Routes>
      </div>
    );
  } else {
    return <Login />;
  }
}

import React from "react";
import { Route, Routes } from "react-router-dom";

import Start from "./pages/Start/Start.js";
import Login from './pages/Login/Login.js';
import Home from "./pages/Home/Home.js";
import NotFound from './pages/NotFound/NotFound.js';
import UserType from './components/UserType/UserType.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';
import MyEventsHost from './pages/MyEventsHost/MyEventsHost.js';
import EventsMap from './pages/EventsMap/EventsMap';
import MyEventsAttendee from "./pages/MyEventsAttendee/MyEventsAttendee.js";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/userType" element={<UserType/>} />
      <Route path="/createAccount" element={<CreateAccount/>} />
      <Route path="/myEventsHost" element={<MyEventsHost/>} />
      <Route path="/myEventsAttendee" element={<MyEventsAttendee/>} />
      <Route path="/map" element={<EventsMap/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}
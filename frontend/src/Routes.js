import React from "react";
import { Route, Routes } from "react-router-dom";

import Start from "./Components/Start/Start.js";
import Login from './Components/Login/Login.js';
import Home from "./Components/Home/Home.js";
import NotFound from './Components/NotFound/NotFound.js';
import UserType from './Components/UserType/UserType.js';
import CreateAccount from './Components/CreateAccount/CreateAccount.js';
import MyEventsHost from './Components/MyEventsHost/MyEventsHost.js';
import EventsMap from './Components/EventsMap/EventsMap';
import MyEventsAttendee from "./Components/MyEventsAttendee/MyEventsAttendee.js";

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
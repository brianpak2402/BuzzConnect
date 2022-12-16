import React, { useState, useEffect } from 'react'
import Pagination from '../Pagination/Pagination';
import {Link} from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import FilterEvent from "../Filter/FilterEvent";

import { getAllEventsForUser, setInvitees} from '../../services/EventService'
import { getMapData } from '../../services/LocationService';
import { listEventsToAttend } from '../../services/AttendeeService';

import './Home.css'

export default function Home() {
  
    var [ events, setEvents ] = useState();
    //var [ mapData, setMapData ] = useState();
    const [attendingEvents, setAttendingEvents] = useState([])
    const [filterEvents, setFilterEvents] = useState([]);
  
    const verifyDate = (dateTime, date) => {
        let regex = new RegExp(date);
        return regex.test(dateTime)
    }


    useEffect(() => {
        const userId = window.sessionStorage.getItem("userId");
        // set invitee usernames to pass in to setInvitees
        // const inviteeUsernames = ["imanattendee", "alexcsoong"];
        // setInvitees(eventId, inviteeUsernames);

        if (userId !== null) {
            getAllEventsForUser(userId)
                .then((res) => {
                    setEvents(res.data)
                    let hostFilter = window.sessionStorage.getItem('hostChoice');
                    let locFilter = window.sessionStorage.getItem('locChoice');
                    let dateFilter = window.sessionStorage.getItem('dateChoice');
                    (res.data).forEach((elm) => {
                        let filteredElm = true;
                        if (dateFilter !== 'null') {
                            filteredElm = verifyDate(elm.dateTime, dateFilter)
                        }
                        if (filteredElm && locFilter !== 'null') {
                            console.log('a', elm.location.name, 'a')
                            console.log('a', locFilter, 'a')
                            filteredElm = (elm.location.name === locFilter)
                        }
                        if (filteredElm && hostFilter !== 'null') {
                            filteredElm = (elm.host.username === hostFilter)
                        }
                        if (filteredElm) {
                            setFilterEvents(arr => [...arr, elm])
                        }
                    })

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, []) 

    // for checking time conflicts
    useEffect(() => {
        if (sessionStorage.getItem("userType") === "Attendee") {
            async function getAttendingEvents() {
                const userId = window.sessionStorage.getItem("userId");
                const response = await listEventsToAttend(userId);
                console.log(response);
                setAttendingEvents(response);
            }
            getAttendingEvents();   
        }
    }, [])

    return (
        <div className='whole-screen'>
            <Navbar/> 
            <div className="events-home">
                <div className='header-row'>
                    <h1>EVENTS</h1>
                    <div className='yellow-line' />
                </div>
                <div className='event-data'>
                    {filterEvents.length > 0 && <Pagination component={filterEvents}/>}
                    <FilterEvent/>
                </div>
            </div>
        </div>

    );
}
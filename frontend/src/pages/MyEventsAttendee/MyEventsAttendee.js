import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AccordionDropdown from '../../components/AccordionDropdown/AccordionDropdown'
import RSVPPopup from "../../components/RSVPPopup/RSVPPopup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, } from '@fortawesome/free-solid-svg-icons'

import {listEventsToAttend} from '../../services/AttendeeService';
import { getEventsInvitedTo } from '../../services/AttendeeService';

import "./MyEventsAttendee.css";

export default function MyEventsAttendee() {
    var [ eventData, setEventData ] = useState([]);
    var [ eventInvitedToData, setEventInvitedToData] = useState([]);
    const userId = window.sessionStorage.getItem("userId");
    const userType = window.sessionStorage.getItem("userType");
    const [closeAll, setCloseAll] = useState(false);

    const [editRSVPIsOpen, setEditRSVPOpen] = useState(false);
    const [currentOpenEventPopup, setCurrentOpenEventPopup] = useState(-1);
    function toggleEditRSVPPopup(eventId) {
        setEditRSVPOpen(!editRSVPIsOpen);
        setCurrentOpenEventPopup(eventId);
        console.log(eventId);
    }

    const [timeConflicts, setTimeConflicts] = useState([]);

    useEffect(() => {
        listEventsToAttend(userId).then(response =>{
            setEventData(response)
            let newTimeConflicts = []
            for (let i = 0; i < response.length - 1; i++) {
                let event1 = response[i];
                let time1 = event1.dateTime;
                for (let j = i + 1; j < response.length; j++) {
                    let event2 = response[j];
                    let time2 = event2.dateTime;
                    if (time1 === time2) {
                        newTimeConflicts.push(event1.title + " & " + event2.title)
                    }
                }
            }
            setTimeConflicts(newTimeConflicts);
        })
        getEventsInvitedTo(userId).then((res) => {
            setEventInvitedToData(res);
        })
    }, [userId])
    

    const events=eventData?.map((event)=>{
        const [date, time, meridiem] = event.dateTime.split(" ");

        return <div className="event-boxes">
            <h1>{event.title}</h1>
            <h2>Location: {event.location.name}</h2>
            <h2>Date: {date}</h2>
            <h2>Time: {time} {meridiem}</h2>
            <div className='description-box'>Description: {event.description}</div>
            <input
                className='edit-rsvp-btn'
                type='button'
                value="Edit RSVP"
                onClick={() => toggleEditRSVPPopup(event.id)}
            />   
            <div>
                {editRSVPIsOpen && currentOpenEventPopup === event.id && <RSVPPopup
                    name={event.title}
                    creator={event.hostName}
                    handleClose={toggleEditRSVPPopup}
                    id={event.id}
                />}
            </div>   
        </div>
    })

    const eventInvitedTo=eventInvitedToData?.map(({title, hostName, location, dateTime, description, isOwner, id, isInviteOnly, isUserInvited, closeAll}) => {
        console.log("invited to " + eventInvitedToData)
        return <div className="event-invited-to">
            <AccordionDropdown title={title} hostName={hostName} location={location} dateTime={dateTime} 
                        description={description} isOwner={isOwner} userType={userType} id={id} isInviteOnly={isInviteOnly} isUserInvited={isUserInvited}
                        closeAll={closeAll}
            />   
        </div>   
    })

    const formatConflicts=timeConflicts?.map((conflict) => {
        return <div className="conflict-boxes">
            <h1>{conflict}</h1>
        </div>
    })    

    useEffect(() => {
        if (closeAll) {
            console.log(closeAll)
        }
        setCloseAll(false)
    }, [closeAll])

    console.log(timeConflicts)
    return (
        <div className="whole-screen">
            <Navbar/>
            <div className="my-events-attending">
                <div className='header-row'>
                    <h1>My Events</h1>
                    <div className='yellow-line' />
                </div>
                <div className="my-events-attending-elements">
                    <div className="events-already-rsvpd">
                        <h2>I am attending...</h2>
                        <div className="rsvp-region">
                            {events}
                        </div>
                        {/* <div>
                            {editRSVPIsOpen && <RSVPPopup
                                name={events.event.title}
                                creator={events.event.hostName}
                                handleClose={toggleEditRSVPPopup}
                                id={events.event.id}
                            />}
                        </div> */}
                    </div>
                    <div className="right-area">
                        <div>
                            <h2>Invitations</h2>
                            <div className="invitations">
                                {eventInvitedTo}
                            </div>
                        </div>
                        <div className="conflict-area">
                            {timeConflicts.length !== 0 && <h3> <FontAwesomeIcon icon={faCaretLeft}/> Time Conflicts</h3>}
                            <div className="conflicts">
                                {formatConflicts}
                            </div>
                        </div>
                    </div>
                </div>

            
            </div>
            {/* <div>
                {editRSVPIsOpen && <RSVPPopup
                    name={events.event.title}
                    creator={events.event.hostName}
                    handleClose={toggleEditRSVPPopup}
                    id={events.event.id}
                />}
            </div> */}
        </div>
    )
}
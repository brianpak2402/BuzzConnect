import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import { createEvent, setInvitees } from "../services/EventService";
import { getAllAttendees} from "../services/AttendeeService";
import "./EventPopup.css";

const formatDate = date => {
    var [month, day, year, hours, minutes] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
    ]  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    month++;
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    year = year < 1000 ? '0' + year : year;

    return month + "-" + day + "-" + year + " " + hours + ':' + minutes + ' ' + ampm;
}

const CreatePopup = props => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("")
    const [dateTime, setDateTime] = useState(new Date());   // to be maintained locally
    const [dateTimeStr, setDateTimeStr] = useState(formatDate(dateTime))
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [invite, setInvite] = useState(false);
    const navigate = useNavigate();
    const hostId = window.sessionStorage.getItem("userId");
    const [username, setUsername] = useState('');
    const [checkUsername, setCheckUsername] = useState(false);
    const [invitees, setWantedInvitees] = useState([]);

    const handleAllChanges = event => {
        createEvent(title, location, dateTimeStr, description, capacity, invite, hostId).then((res) => {
            setInvitees(res.data.id, invitees).then(() => {
                navigate("/home");
            });
        })
    }

    const handleTitleChange = event => {
        setTitle(event.target.value);
    }

    const handleLocationChange = event => {
        setLocation(event.target.value);
    }

    const handleDateTimeChange = event => {
        setDateTimeStr(formatDate(event));
        setDateTime(event)
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const handleCapacityChange = event => {
        setCapacity(event.target.value)
    }

    const handleInviteChange = event => {
        setInvite(!invite);
    }

    const checkInvitee = () => {
        setCheckUsername(true);
    }

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    useEffect(() => {
        if (checkUsername) {
            getAllAttendees()
            .then((res) => {
                res.forEach((elm) => {
                    if (username === elm.username) {
                        if (!invitees.includes(username)) {
                            if (invitees.length != 0) {
                                setWantedInvitees(arr => [...arr, ", "]);
                            }
                            setWantedInvitees(arr => [...arr, username]); 
                            setUsername("");
                        }
                    }
                })
            })
            .catch((err) => {
               console.log(err);
            });
        }
        setCheckUsername(false);
    }, [checkUsername, invitees, username]);

    return (
        <div className="backgnd-box">
            <div className="event-popup-box">
                <h1 className="popup-head">Create Event</h1>
                <form className="event-form">
                    <div className="input-row">
                        <h2>Title:</h2>
                        <input className="text-in" type="text" id="title" onChange={handleTitleChange} value={title}/>
                    </div>
                    <div className="input-row">
                        <h2>Location:</h2>
                        <input className="text-in" type="text" id="location" onChange={handleLocationChange} value={location}/>
                    </div>
                    <div className="input-row">
                        <h2>Date & Time:</h2>
                        {/* <input className="text-in" type="text" id="time" onChange={handleDateTimeChange} value={dateTime} placeholder="MM-DD-YYYY HH:MM AM/PM (e.g. 01-01-2023 01:01 PM)"/> */}
                        <DateTimePicker onChange={handleDateTimeChange} 
                                        value={dateTime}
                                        format="MM-dd-yyyy hh:mm a"
                                        dayPlaceholder="dd"
                                        monthPlaceholder="mm"
                                        yearPlaceholder="yyyy"
                                        hourPlaceholder="hh"
                                        minutePlaceholder="mm"
                                        className="date-in"
                        />
                    </div>
                    <h2>Description:</h2>
                    <textarea className="description" type="text" id="description" onChange={handleDescriptionChange} value={description}/>
                    {/* </textarea> */}
                    <div className="attend-row">
                        <div className="invite-check">
                            <input type="checkbox" id="invite" onChange={handleInviteChange} value={invite}/>
                            <h2>Invite Only?</h2>
                        </div>
                        <div className="capacity">
                            <h2>Capacity:</h2>
                            <input className="cap-in" type="text" id="capacity" onChange={handleCapacityChange} value={capacity}/>
                        </div>
                    </div>
                </form>
                <div className="invite-search">
                    {!invite && <h3 className="padding"> </h3>}
                    {invite && <input className="invite-search-bar" type="text" placeholder="Search for users to invite..." onChange={handleUsernameChange} value={username}/>}
                    {invite && <button className="invitee-submit" onClick={checkInvitee}>Invite</button>}
                    {invite && <h3 className="invitees">Invitees: {invitees}</h3>}
                </div>

                <div className="button-row">
                    <button className="cancel-btn" onClick={props.handleClose}>Cancel</button>
                    <button className="save-btn" onClick={handleAllChanges}>Create</button> 
                </div>
            </div>
        </div>
    );
};

export default CreatePopup;
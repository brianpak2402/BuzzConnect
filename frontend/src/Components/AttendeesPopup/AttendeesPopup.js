import React from 'react';
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {getAllWillAttendUsers, getAllMightAttendUsers, getAllWillNotAttendUsers, getInviteOnlyStatus} from "../../services/EventService";
import {removeRsvpFromEvent} from "../../services/AttendeeService";
import AttendeeList from "../AttendeeList/AttendeeList";
import './AttendeesPopup.css'

function AttendeesPopup(props) {
    const [willAttend, setWillAttend] = useState([])
    const [mightAttend, setMightAttend] = useState([])
    const [willNotAttend, setWillNotAttend] = useState([])
    const [noResponse, setNoResponse] = useState([])

    const [willAttendBtn, setWillAttendBtn] = useState('selected')
    const [mightAttendBtn, setMightAttendBtn] = useState('unselected')
    const [willNotAttendBtn, setWillNotAttendBtn] = useState('unselected')
    const [noResponseBtn, setNoResponseBtn] = useState('unselected')

    const [willAttendShowing, setWillAttendShowing] = useState(true)
    const [mightAttendShowing, setMightAttendShowing] = useState(false)
    const [willNotAttendShowing, setWillNotAttendShowing] = useState(false)
    const [noResponseShowing, setNoResponseShowing] = useState(false)
    const [inviteOnlyStatus, setInviteOnlyStatus] = useState(false)

    const [removeList, setRemoveList] = useState([])
    const [removeItem, setRemoveItem] = useState(null)
    const [beginRemove, setBeginRemove] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        getInviteOnlyStatus(props.eventId)
            .then((res) => {
                setInviteOnlyStatus(res)
            })
    }, []);

    useEffect(() => {
            getAllWillAttendUsers(props.eventId)
                .then((res) => {
                    res.data.forEach((elm) => {
                        setWillAttend(arr => [...arr, {username: elm.username, attendeeID: elm.id}])
                    })
                })
                .catch((err) => {
                    console.log(err)
                });
    }, []);

    useEffect(() => {
        getAllMightAttendUsers(props.eventId)
            .then((res) => {
                res.data.forEach((elm) => {
                    setMightAttend(arr => [...arr, {username: elm.username, attendeeID: elm.id}])
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(() => {
        getAllWillNotAttendUsers(props.eventId)
            .then((res) => {
                res.data.forEach((elm) => {
                    setWillNotAttend(arr => [...arr, {'username': elm.username, 'id': elm.id}])
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    useEffect(() => {
        if (typeof removeItem === 'number') {
            setRemoveList(arr => [...arr, removeItem])
        }
        setRemoveItem(null)
    }, [removeItem])

    useEffect(() => {
        if (beginRemove) {
            removeList.forEach((elm) => {
                removeRsvpFromEvent(elm, props.eventId)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            });
        }
    }, [beginRemove, props.eventId, removeList])

    const handleWillAttend = () => {
        if (willAttendBtn === 'unselected') {
            setWillAttendBtn('selected')
            setMightAttendBtn('unselected')
            setWillNotAttendBtn('unselected')
            setNoResponseBtn('unselected')
        }
        setWillAttendShowing(true)
        setMightAttendShowing(false)
        setWillNotAttendShowing(false)
        setNoResponseShowing(false)
    }

    const handleMightAttend = () => {
        if (mightAttendBtn === 'unselected') {
            setMightAttendBtn('selected')
            setWillAttendBtn('unselected')
            setWillNotAttendBtn('unselected')
            setNoResponseBtn('unselected')
        }
        setMightAttendShowing(true)
        setWillAttendShowing(false)
        setWillNotAttendShowing(false)
        setNoResponseShowing(false)
    }

    const handleWillNotAttend = () => {
        if (willNotAttendBtn === 'unselected') {
            setWillNotAttendBtn('selected')
            setWillAttendBtn('unselected')
            setMightAttendBtn('unselected')
            setNoResponseBtn('unselected')
        }
        setWillNotAttendShowing(true)
        setWillAttendShowing(false)
        setMightAttendShowing(false)
        setNoResponseShowing(false)
    }

    const handleNoResponse = () => {
        if (noResponseBtn === 'unselected') {
            setNoResponseBtn('selected')
            setWillAttendBtn('unselected')
            setMightAttendBtn('unselected')
            setWillNotAttendBtn('unselected')
        }
        setNoResponseShowing(true)
        setWillNotAttendShowing(false)
        setWillAttendShowing(false)
        setMightAttendShowing(false)
    }

    const handleSelectInvitees = (e) => {
        if (!removeList.includes(e)) {
            setRemoveItem(e)
        }
    }

    const handleRemove = () => {
        setBeginRemove(true);
        navigate(0);
    }

    return (
        <div className='background-box'>
            <div className='attendee-popup-box'>
                <div className='header'>
                    <h1 className='header-txt'>Attendees</h1>
                    <button className={willAttendBtn} onClick={handleWillAttend}>Will Attend</button>
                    <button className={mightAttendBtn} onClick={handleMightAttend}>Maybe</button>
                    <button className={willNotAttendBtn} onClick={handleWillNotAttend}>Will Not Attend</button>
                    {inviteOnlyStatus && <button className={noResponseBtn} onClick={handleNoResponse}>No Response</button>}
                </div>
                <div className='attendees-list'>
                    {willAttendShowing && (willAttend).map(({username, attendeeID}) => (<div className='attendee-name'>
                        {props.checkBox && <input type="checkbox" onChange={() => {handleSelectInvitees(attendeeID)}} value={props.name} style={{width: '25px', height: '25px', cursor: 'pointer'}}/>}
                        <AttendeeList name={username} ></AttendeeList>
                    </div>))}
                    {mightAttendShowing && (mightAttend).map(({username, attendeeID}) => (<div className='attendee-name'>
                        {props.checkBox && <input type="checkbox" onChange={() => {handleSelectInvitees(attendeeID)}} value={props.name} style={{width: '25px', height: '25px', cursor: 'pointer'}}/>}
                        <AttendeeList checkBox={props.checkBox} name={username}></AttendeeList>
                    </div>))}
                    {willNotAttendShowing && (willNotAttend).map(({username, attendeeID}) => (<div className='attendee-name'>
                        {props.checkBox && <input type="checkbox" onChange={() => {handleSelectInvitees(attendeeID)}} value={props.name} style={{width: '25px', height: '25px', cursor: 'pointer'}}/>}
                        <AttendeeList checkBox={props.checkBox} name={username}></AttendeeList>
                    </div>))}
                    {inviteOnlyStatus && noResponseShowing && (noResponse).map(({username, attendeeID}) => (<div className='attendee-name'>
                        {props.checkBox && <input type="checkbox" onChange={() => {handleSelectInvitees(attendeeID)}} value={props.name} style={{width: '25px', height: '25px', cursor: 'pointer'}}/>}
                        <AttendeeList checkBox={props.checkBox} name={username}></AttendeeList>
                    </div>))}
                </div>
                <div className='footer'>
                    <button className='cancel-btn' onClick={props.handleClose}>Cancel</button>
                    {props.checkBox && <button className='rem-btn' onClick={handleRemove}>Remove</button>}
                </div>
            </div>
        </div>
    );
}

export default AttendeesPopup
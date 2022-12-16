import React, {useEffect, useState} from 'react'
import './Accordion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faUser } from '@fortawesome/free-solid-svg-icons'
import RemPopup from "../RemovePopup/RemovePopup"
import RSVPPopup from "../RSVPPopup/RSVPPopup"
import EdPopup from "../EditPopup"
import Saved from "../Saved/Saved"
import AttendeesPopup from "../AttendeesPopup/AttendeesPopup";
import { getInviteOnlyStatus } from '../../services/EventService'
import { getEvent } from "../../services/EventService"

function toggleChevron(currIcon) {
    if (currIcon === faChevronUp) {
        return faChevronDown
    }
    return faChevronUp
}

function toggleClassname(classname) {
    if (classname === 'accordion-dropdown-closed') {
        return 'accordion-dropdown-open'
    }
    return 'accordion-dropdown-closed'
}

function closeDropdown(setClassname, setCurrIcon) {
    setClassname('')
    setCurrIcon(faChevronDown)
}

function AccordionDropdown({title, hostName, location, dateTime, description, isOwner, userType, id, isInviteOnly, isUserInvited, closeAll}) {
    const [date, time, meridiem] = dateTime.split(" ");

    const [remIsOpen, setRemOpen] = useState(false);
    const userId = window.sessionStorage.getItem("userId");

    const toggleRemPopup = () => {
        setRemOpen(!remIsOpen);
    }

    const [edIsOpen, setEdOpen] = useState(false);
    const toggleEdPopup = () => {
        setEdOpen(!edIsOpen)
    }

    const [savedIsOpen, setSavedOpen] = useState(false);
    const toggleSaved = () => {
        setSavedOpen(!savedIsOpen);
        setEdOpen(!edIsOpen);
    }

    const [rsvpIsOpen, setRSVPOpen] = useState(false);
    const toggleRSVPPopup = () => {
        setRSVPOpen(!rsvpIsOpen);
    }

    const [attendeesIsOpen, setAttendeesIsOpen] = useState(false);
    const toggleAttendees = () => {
        setAttendeesIsOpen(!attendeesIsOpen);
    }

    const [isActive, setActive] = useState(false);
    const [currIcon, setCurrIcon] = useState(faChevronDown);
    const [classname, setClassname] = useState('accordion-dropdown-closed')
    const[inviteOnlyStatus, setInviteOnlyStatus] = useState();

    useEffect(() => {
        if (closeAll) {
            closeDropdown(setClassname, setCurrIcon)
            setActive(false)
        }
        
        if (id) {
            getInviteOnlyStatus(id).then(response => {
                setInviteOnlyStatus(response.data);
            })
        }
    }, [closeAll, id])

    const [maxCapacity, setMaxCapacity] = useState(0)
    const [currCapacity, setCurrCapacity] = useState(0)

    useEffect(() => {
        if (id) {
            getEvent(id).then((res) => {
                setMaxCapacity(res.data.maxCapacity)
                setCurrCapacity(res.data.currentCapacity)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [id])


    function setBtns() {
        if (userType.toLowerCase() === 'host' && isOwner) {
            if (isOwner) {
                return (
                    <div style={{height: '80%', width: '100%'}}>
                        <input
                            className='acc-edit-btn'
                            type='button'
                            value="Edit"
                            onClick={toggleEdPopup}
                        />
                        <input
                            className='acc-remove-btn'
                            type='button'
                            value="Remove"
                            onClick={toggleRemPopup}
                        />
                    </div>
                );
            }
            return <div/>
        }
        if (userType.toLowerCase() === 'moderator') {
            return (
                <div style={{height: '80%', width: '100%'}}>
                    <input
                        className='acc-remove-btn'
                        type='button'
                        value="Remove"
                        onClick={toggleRemPopup}
                    />
                </div>
            );
        }
        if (userType.toLowerCase() === 'attendee') {
            if (inviteOnlyStatus === true && isUserInvited === true) {
                return (
                    <div style={{height: '80%', width: '100%'}}>
                        <input
                            className = 'acc-rsvp-btn'
                            type='button'
                            onClick={toggleRSVPPopup}
                            value="RSVP"
                        />
                    </div>
                );
            }  else if (inviteOnlyStatus === false) {
                return (
                    <div style={{height: '80%', width: '100%'}}>
                        <input
                            className = 'acc-rsvp-btn'
                            type='button'
                            onClick={toggleRSVPPopup}
                            value="RSVP"
                        />
                    </div>
                );
            }
        }
    }

    return(
        <div>
            <div className={classname} onClick={() => {setActive(!isActive); setCurrIcon(toggleChevron(currIcon)); setClassname(toggleClassname(classname))}}>
                <div className='event-title'>{title}</div>
                <div className='header-right'>
                    <div className='event-created-by'><span style={{fontWeight: '600'}}>Created by: </span>{hostName}</div>
                    <FontAwesomeIcon className='fa-2x' icon={currIcon} style={{color: '#9CA6C6'}} />
                </div>
            </div>
            {isActive && <div className='acc-value'>
                <div className='acc-row'>
                    <div className='acc-description'><span style={{fontWeight: '600'}}>Description: </span>{description}</div>
                    <div className='acc-btn-col'>
                        <div className='acc-attendees-btn' onClick={toggleAttendees}>{currCapacity}/{maxCapacity} Attendees <FontAwesomeIcon icon={faUser}/></div>
                        {setBtns()}
                    </div>
                </div>
                <div className='acc-txt-col'>
                    <div><span style={{fontWeight: '600'}}>Location: </span>{location.name}</div>
                    <div><span style={{fontWeight: '600'}}>Date: </span>{date}</div>
                    <div><span style={{fontWeight: '600'}}>Time: </span>{time + " " + meridiem}</div>
                </div>
            </div>}

            <div>
                {remIsOpen && <RemPopup
                    name={title}
                    creator={hostName}
                    handleClose={toggleRemPopup}
                    id={id}
                />}
                {edIsOpen && <EdPopup
                    handleClose={toggleEdPopup}
                    handleSaved={toggleSaved}
                    title={title}
                    location={location.name}
                    datetime={dateTime}
                    description={description}
                    capacity={maxCapacity}
                    id={id}
                />}
                {rsvpIsOpen && <RSVPPopup
                    name={title}
                    creator={hostName}
                    handleClose={toggleRSVPPopup}
                    id={id}
                />}
                {savedIsOpen && <Saved />}
                {attendeesIsOpen && <AttendeesPopup
                    eventId={id}
                    checkBox={isOwner}
                    handleClose={toggleAttendees}>
                </AttendeesPopup>}
            </div>
            
        </div>
    );
}

export default AccordionDropdown
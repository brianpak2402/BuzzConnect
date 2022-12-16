import React from "react";
import { useNavigate } from 'react-router-dom';
import RSVPDropdown from "../RSVPDropdown/RSVPDropdown";

import { rsvpToEvent } from "../../services/AttendeeService";

import "./RSVPPopup.css";

const RSVPPopup = props => {
    const attendeeId = window.sessionStorage.getItem("userId");
    const navigate = useNavigate();
    return (
        <div className="backgnd-box">
            <div className="rsvp-popup-box">
                <h1 className="rsvp-title">RSVP?</h1>
                <h3>{props.name}, created by {props.creator}</h3>
                <div className="rsvp-dropdown"><RSVPDropdown id={props.id}></RSVPDropdown></div>
                <div className="button-row">
                    <button className="cancel-btn" onClick={props.handleClose}>Cancel</button>
                    <button className="rsvp-btn-pop" onClick={() => {
                        props.handleClose();
                        navigate(0);
                    }}>Confirm</button> 
                </div>
            </div>
        </div>
    );
};
   
export default RSVPPopup;
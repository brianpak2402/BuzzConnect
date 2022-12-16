import React from "react";
import { useNavigate } from 'react-router-dom';
import "./RemovePopup.css";

import { removeEvent } from "../../services/EventService";

const RemPopup = props => {
    const navigate = useNavigate();
    return (
        <div className="backgnd-box">
            <div className="rem-popup-box">
                <h1 className="rem-title">Are you sure you want to remove this event?</h1>
                <h2>This action cannot be undone.</h2>
                <h3>{props.name}, created by {props.creator}</h3>
            <div className="button-row">
                <button className="cancel-btn" onClick={props.handleClose}>Cancel</button>
                <button className="remove-btn-pop" onClick={() => {
                    removeEvent(props.id); 
                    props.handleClose();
                    navigate(0);
                }}>Remove</button> 
            </div>
            </div>
        </div>
    );
};
   
export default RemPopup;
import React from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "./UserType.css";

function UserType() {
    return(
        <div className="UserType">
            <Link to={'/'} className='user-type-icon'>
                <FontAwesomeIcon className='fa-3x' icon={faArrowLeft} style={{color: '#003057'}}/>
            </Link>
            <h1>How are you using this site?</h1>
            <p>I'll be attending an event</p>
            <Link to={"/createAccount"} style={{textDecoration: 'none'}}>
                <button className="UserType-btn" onClick={() => window.sessionStorage.setItem("userType", "Attendee")}>Attendee</button>
            </Link>
            <p>I'll be hosting an event</p>
            <Link to="/createAccount" style={{textDecoration: 'none'}}>
                <button className="UserType-btn" onClick={() => window.sessionStorage.setItem("userType", "Host")}>Host</button>
            </Link>
            <p>I am a moderator</p>
            <Link to="/createAccount" style={{textDecoration: 'none'}}>
                <button className="UserType-btn" onClick={() => window.sessionStorage.setItem("userType", "Moderator")}>Moderator</button>
            </Link>
        </div>
    );
}

export default UserType;
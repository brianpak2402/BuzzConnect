import React from 'react'
import './CreateAccount.css'
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { createAttendee } from '../../services/AttendeeService';
import { createHost } from '../../services/HostService';
import { createAdmin } from '../../services/AdminService';

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const userType = window.sessionStorage.getItem("userType");

    function handleAccountCreation(event) {
        event.preventDefault();
        if (userType === "Attendee") {
            createAttendee(username, password).then(res => {
                window.sessionStorage.setItem("userId", res.data.id);
                window.sessionStorage.setItem("userType", "Attendee");
                navigate("/home");
            })
        } else if (userType === "Host") {
            createHost(username, password).then(res => {
                window.sessionStorage.setItem("userId", res.data.id);
                window.sessionStorage.setItem("userType", "Host");
                navigate("/home");
            });
        } else if (userType === "Moderator") {
            createAdmin(username, password).then(res => {
                window.sessionStorage.setItem("userId", res.data.id);
                window.sessionStorage.setItem("userType", "Moderator");
                navigate("/home");
            });
        }
    }
    return(
        <div className="create-account" style={{textDecoration: 'none'}}>
            <Link to={'/userType'} className='icon'>
                <FontAwesomeIcon className='fa-3x' icon={faArrowLeft} style={{color: '#003057'}}/>
            </Link>
            <h1>Create Account</h1>
            <p>Creating account as: {window.sessionStorage.getItem("userType")}</p>
            <form className='form' onSubmit={handleAccountCreation}>
                <div>
                    <input className='textIn' type="text" id="username" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} required pattern="^\d*[a-zA-Z][a-zA-Z0-9!?.,<>@#$%^&*()_+=]*$" />
                </div>
                <br/>
                <div>
                    <input className='textIn' type="text" id="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} required pattern="^\d*[a-zA-Z][a-zA-Z0-9!?.,<>@#$%^&*()_+=]*$"/>
                </div>
                <br/>
                <input className='submit' type="submit"/>
            </form>
        </div>
    );
}
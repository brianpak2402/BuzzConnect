import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../services/API";

import "./Login.css";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();
        login(username, password).then(res => {
            window.sessionStorage.setItem("userId", res.data.id);
            window.sessionStorage.setItem("userType", res.data.userType);
            window.sessionStorage.setItem("username", res.data.username)
            navigate('/home');
        })
    }

    const handleFilters = () => {
        window.sessionStorage.setItem('hostChoice', null);
        window.sessionStorage.setItem('locChoice', null);
        window.sessionStorage.setItem('dateChoice', null);
    }

    return(
        <div className="Login">
            <Link to={'/'} className='icon'>
                <FontAwesomeIcon className='fa-3x' icon={faArrowLeft} style={{color: '#003057'}}/>
            </Link>
            <h1>Log In</h1>
            <form className="form" onSubmit={handleLogin}>
                <input className="textIn" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required pattern="^\d*[a-zA-Z][a-zA-Z0-9!?.,<>@#$%^&*()_+=]*$" placeholder="USERNAME"/>
                <br/>
                <input className="textIn" type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required pattern="^\d*[a-zA-Z][a-zA-Z0-9!?.,<>@#$%^&*()_+=]*$" placeholder="PASSWORD"/>
                <br/>
                <input onClick={handleFilters} className="submit" type="submit" value="Log In" />
            </form>
        </div>
    );
}
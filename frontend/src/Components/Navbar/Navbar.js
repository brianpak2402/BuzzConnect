import React from 'react'
import {Link} from 'react-router-dom'

import './Navbar.css'

function Navbar() {
    const userType = window.sessionStorage.getItem("userType");

    return (
        <div className='Navbar' >
            <h1>BuzzConnect</h1>
            <Link className='navbar-label' to={"/home"}>
                <label style={{cursor: 'pointer'}}>Events</label>
            </Link>
            {userType.toLowerCase() === 'host' &&
                <Link className='navbar-label' to={"/myEventsHost"}>
                    <label style={{cursor: 'pointer'}}>My Events</label>
                </Link> 
            }
            {userType.toLowerCase() === 'attendee' &&
                <Link className='navbar-label' to={"/myEventsAttendee"}>
                    <label style={{cursor: 'pointer'}}>My Events</label>
                </Link> 
            }
            <Link className='navbar-label' to={"/map"}>
                <label style={{cursor: 'pointer'}}>Map</label>
            </Link>
            <Link className='navbar-label' to={"/"}>
                <label style={{cursor: 'pointer'}}>Logout</label>
            </Link>
        </div>
    );
}

export default Navbar;
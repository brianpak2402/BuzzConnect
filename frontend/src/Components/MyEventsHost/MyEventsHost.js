import React, { useState } from "react";
import CreatePopup from "../CreatePopup"
import Navbar from "../Navbar/Navbar"

import "./MyEventsHost.css";

export default function MyEventsHost() {
    const [createIsOpen, setCreateOpen] = useState(false);
    const toggleCreatePopup = () => {
        setCreateOpen(!createIsOpen);
    }

    return (
        <div>
            <Navbar />
            <div className="my-events">
                <div className='header-row'>
                    <h1>My Events</h1>
                    <div className='yellow-line' />
                </div>
                <h2 className="create-title">New Event</h2>
                <div className="new-event">
                    <h2 className="label">Fill out the form to create a new event</h2>
                    <input
                        className='create-btn'
                        type='button'
                        value="+"
                        onClick={toggleCreatePopup}
                    />
                </div>

                {createIsOpen && <CreatePopup
                    handleClose={toggleCreatePopup}
                />}
            </div>
        </div>
    )
}

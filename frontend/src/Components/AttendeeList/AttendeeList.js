import React from 'react'
import './AttendeeList.css'

function AttendeeList(props) {
    return (
        <div className='attendee-row'>
            <div className='attendee-name'>
                {props.name}
            </div>
        </div>
    );
}

export default AttendeeList
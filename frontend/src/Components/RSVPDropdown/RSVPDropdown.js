import React from "react";

import { rsvpToEvent } from "../../services/AttendeeService";
import "./RSVPDropdown.css";
import { useNavigate } from 'react-router-dom';


class RSVPDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {eventId: props.id};
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        const attendeeId = window.sessionStorage.getItem("userId");
        this.setState({rsvpStatus: event.target.value});
        rsvpToEvent(attendeeId, this.state.eventId, event.target.value);
      }
    
      render() {
        return (
          <div className="dropdown">
            <form>
              <label>
                <select value={this.state.rsvpStatus} onChange={this.handleChange}>
                  <option value=""></option>
                  <option value="willAttend">Will Attend</option>
                  <option value="mightAttend">Might Attend</option>
                  <option value="willNotAttend">Will Not Attend</option>
                  <option value="removingRSVPStatus">Remove RSVP Status</option>
                </select>
              </label>
            </form>
          </div>
        );
      }
    
}

export default RSVPDropdown;

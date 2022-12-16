package com.team56.BuzzConnect.domain.user;

import javax.persistence.*;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.team56.BuzzConnect.domain.event.Event;

@Entity
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "attendee_id"))
})
public class Attendee extends User {

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH } )
    @JoinTable(
        name = "will_attend_events",
        joinColumns = @JoinColumn(name = "attendee_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @JsonBackReference
    private Set<Event> willAttendEvents;
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH } )
    @JoinTable(
        name = "might_attend_events",
        joinColumns = @JoinColumn(name = "attendee_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @JsonBackReference
    private Set<Event> mightAttendEvents;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH } )
    @JoinTable(
        name = "will_not_attend_events",
        joinColumns = @JoinColumn(name = "attendee_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @JsonBackReference
    private Set<Event> willNotAttendEvents;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH } )
    @JoinTable(
        name = "invited_events",
        joinColumns = @JoinColumn(name = "attendee_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @JsonBackReference
    private Set<Event> invitedEvents;

    // Constructor
    public Attendee() {
        super();
        this.setUserType("Attendee");
    }

    public Attendee(String username, String password) {
        super(username, password);
    }

    // Functions for willAttendEvents
    public Set<Event> getWillAttendEvents() {
        return this.willAttendEvents;
    }

    public void setWillAttendEvents(Set<Event> newSet) {
        this.willAttendEvents = newSet;
    }

    // Functions for willAttendEvents
    public Set<Event> getMightAttendEvents() {
        return this.mightAttendEvents;
    }

    public void setMightAttendEvents(Set<Event> newSet) {
        this.mightAttendEvents = newSet;
    }

    // Functions for willAttendEvents
    public Set<Event> getWillNotAttendEvents() {
        return this.willNotAttendEvents;
    }

    public void setWillNotAttendEvents(Set<Event> newSet) {
        this.willNotAttendEvents = newSet;
    }

    // Functions for RSVP status (in general)
    public void addEventRSVP(Event event, String newRSVP) throws IllegalArgumentException{
        if (newRSVP == null) {
            throw new IllegalArgumentException(newRSVP + " is not valid.");
        } else if (newRSVP.equals("willAttend")) {
            this.willAttendEvents.add(event);
        } else if (newRSVP.equals("mightAttend")) {
            this.mightAttendEvents.add(event);
        } else if (newRSVP.equals("willNotAttend")) {
            this.willNotAttendEvents.add(event);
        } 
    }

    public void removeEventRSVP(Event event) throws IllegalArgumentException {
        if (this.willAttendEvents.contains(event)) {
            this.willAttendEvents.remove(event);
        } else if (this.mightAttendEvents.contains(event)) {
            this.mightAttendEvents.remove(event);
        } else if (this.willNotAttendEvents.contains(event)) {
            this.willNotAttendEvents.remove(event);
        } else {
            throw new IllegalArgumentException("This attendee has not RSVP'd for the event - " + event.toString());
        }
    }

    // Functions for invitedEvents
    public Set<Event> getInvitedEvents() { // alex
        return this.invitedEvents;
    }

    public void addEventAsInvited(Event event) {
        this.invitedEvents.add(event);
    }

    public void removeInvitedEvent(Event event) {
        this.invitedEvents.remove(event);
    }

}
package com.team56.BuzzConnect.domain.event;

import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.*;

import com.team56.BuzzConnect.domain.user.Attendee;
import com.team56.BuzzConnect.domain.user.Host;
import com.team56.BuzzConnect.domain.location.Location;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "event")
public class Event {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "title", unique = true)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REFRESH })
    @JoinColumn(name = "location_id", nullable = true)
    private Location location;

    @Column(name = "date_time")
    @JsonFormat(pattern = "MM-dd-yyyy' 'hh:mm a")
    @DateTimeFormat(pattern = "MM-dd-yyyy' 'hh:mm a")
    private LocalDateTime dateTime; 

    @Column(name = "description")
    private String description;

    @Column(name = "current_capacity")
    private int currentCapacity;

    @Column(name = "max_capacity")
    private int maxCapacity;

    // Used for outputting events for frontend
    @Column(name = "is_owner")
    private boolean isOwner;
    
    @Column(name = "user_type")
    private String userType = "Attendee";

    @Column(name = "is_invite_only")
    private boolean isInviteOnly;

    @Column(name = "is_user_invited")
    private boolean isUserInvited;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REFRESH })
    @JoinColumn(name = "host_id", nullable = true)
    private Host host;

    @Column(name = "host_name")
    private String hostName = "";

    @ManyToMany(mappedBy = "willAttendEvents", cascade = {CascadeType.PERSIST, CascadeType.REFRESH })
    @JsonManagedReference
    private Set<Attendee> willAttendUsers;
    
    @ManyToMany(mappedBy = "mightAttendEvents", cascade = {CascadeType.PERSIST, CascadeType.REFRESH })
    @JsonManagedReference
    private Set<Attendee> mightAttendUsers;

    @ManyToMany(mappedBy = "willNotAttendEvents", cascade = {CascadeType.PERSIST, CascadeType.REFRESH })
    @JsonManagedReference
    private Set<Attendee> willNotAttendUsers;

    @ManyToMany(mappedBy = "invitedEvents", cascade = {CascadeType.PERSIST, CascadeType.REFRESH })
    @JsonManagedReference
    private Set<Attendee> invitedUsers;

    // Constructors
    public Event() {
        this.title = "";
        this.location = new Location();
        this.dateTime = LocalDateTime.now();
        this.description = "";

        this.host = new Host();
        this.hostName = this.host.getUsername();

        this.currentCapacity = 0;
        this.maxCapacity = 100;

        this.willAttendUsers = new HashSet<>();
        this.mightAttendUsers = new HashSet<>();
        this.willNotAttendUsers = new HashSet<>();

        this.isInviteOnly = false;
        this.isUserInvited = false;
        this.invitedUsers = new HashSet<>();
    }

    public Event (String title, Location location, LocalDateTime dateTime, 
                    String description, int maxCapacity, boolean isInviteOnly, Host host) {
        this.title = title;
        this.location = location;
        this.dateTime = dateTime;
        this.description = description;

        this.host = host;
        this.hostName = this.host.getUsername();

        this.currentCapacity = 0;
        this.maxCapacity = maxCapacity;
        
        this.willAttendUsers = new HashSet<>();
        this.mightAttendUsers = new HashSet<>();
        this.willNotAttendUsers = new HashSet<>();

        this.isInviteOnly = isInviteOnly;
        this.isUserInvited = false;
        this.invitedUsers = new HashSet<>();
    }


    // Functions for Id
    public int getId(){
        return this.eventId;
    }

    // Functions for title
    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // Functions for dateTime
    public LocalDateTime getDateTime() {
        return this.dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    // Functions for location
    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    // Functions for description
    public String getDescription() {
        return this.description;
    }    

    public void setDescription(String description) {
        this.description = description;
    }

    // Functions for currentCapacity 
    public int getCurrentCapacity() {
        return this.currentCapacity;
    }

    public void setCurrentCapacity() {
        this.currentCapacity = this.willAttendUsers.size();
    }

    // Functions for maxCapacity
    public int getMaxCapacity() {
        return this.maxCapacity;
    }

    public void setMaxCapacity(int capacity) {
        this.maxCapacity = capacity;
    }

    // Functions for host
    public void setHost(Host host) {
        this.host = host;
    }

    public Host getHost() {
        return this.host;
    }

    // Functions for owner
    public boolean getIsOwner() {
       return this.isOwner;
    }

    public void setIsOwner(boolean bool) {
        this.isOwner = bool;
    }

    // Functions for userType 
    public String getUserType() {
        return this.userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
    
    // Functions for hostName
    public String getHostName() {
        return this.hostName;
    }

    public void setHostName(String hostName) {
        this.hostName =  hostName;
    }

    // Functions for the willAttendUsers
    public Set<Attendee> getWillAttendUsers() {
        return this.willAttendUsers;
    }

    public void setWillAttendUsers(Set<Attendee> newSet) {
        this.willAttendUsers = newSet;
    }
    
    public void addAsWillAttend(Attendee attendee) {
        this.willAttendUsers.add(attendee);
        attendee.getWillAttendEvents().add(this);
    }

    // Functions for the mightAttendUsers
    public Set<Attendee> getMightAttendUsers() {
        return this.mightAttendUsers;
    }

    public void setMightAttendUsers(Set<Attendee> newSet) {
        this.mightAttendUsers = newSet;
    }

    public void addAsMightAttend(Attendee attendee) {
        this.mightAttendUsers.add(attendee);
        attendee.getMightAttendEvents().add(this);
    }

    // Functions for the willNotAttendUsers
    public Set<Attendee> getWillNotAttendUsers() {
        return this.willNotAttendUsers;
    }

    public void setWillNotAttendUsers(Set<Attendee> newSet) {
        this.willNotAttendUsers = newSet;
    }

    public void addAsNotAttending(Attendee attendee) {
        this.willNotAttendUsers.add(attendee);
        attendee.getWillNotAttendEvents().add(this);
    }

    // Functions for isUserInvited
    public boolean getIsUserInvited() {
        return this.isUserInvited;
    }

    public void setIsUserInvited(boolean setting) {
        this.isUserInvited = setting;
    }

    // Functions for RSVP status (in general)
    public boolean containsAttendeeRSVP(Attendee attendee) {
        if (this.willAttendUsers.contains(attendee)) {
            return true;
        } else if (this.mightAttendUsers.contains(attendee)) {
            return true;
        } else if (this.willNotAttendUsers.contains(attendee)) {
            return true;
        } else {
            return false;
        }
    }

    public void addAttendeeRSVP(Attendee attendee, String rsvpStatus) throws IllegalArgumentException{
        if (rsvpStatus.equals("willAttend")) {
            this.willAttendUsers.add(attendee);
        } else if (rsvpStatus.equals("mightAttend")) {
            this.mightAttendUsers.add(attendee);
        } else if (rsvpStatus.equals("willNotAttend")) {
            this.willNotAttendUsers.add(attendee);
        } else {
            throw new IllegalArgumentException(rsvpStatus + " is not valid.");
        }
    }

    public void removeAttendeeRSVP(Attendee attendee) throws IllegalArgumentException{
        if (this.willAttendUsers.contains(attendee)) {
            this.willAttendUsers.remove(attendee);
            attendee.removeEventRSVP(this);
        } else if (this.mightAttendUsers.contains(attendee)) {
            this.mightAttendUsers.remove(attendee);
            attendee.removeEventRSVP(this);
        } else if (this.willNotAttendUsers.contains(attendee)) {
            this.willNotAttendUsers.remove(attendee);
            attendee.removeEventRSVP(this);
        } else {
            throw new IllegalArgumentException("This event does not have the attendee - " + attendee.toString() );
        }
    }

    public void clearAllAttendeeRSVP() {
        // Clear the user lists for this event.
        this.willAttendUsers.clear();
        this.mightAttendUsers.clear();
        this.willNotAttendUsers.clear();
    }

    public Set<Attendee> getAllAttendees() {
        Set<Attendee> list = new HashSet<>();
        for (Attendee a : this.willAttendUsers) {
            list.add(a);
        }
        for (Attendee a : this.mightAttendUsers) {
            list.add(a);
        }
        for (Attendee a : this.willNotAttendUsers) {
            list.add(a);
        }

        return list;
    }


    // Functions for invitedUsers
    public Set<Attendee> getInvitedUsers() {
        return this.invitedUsers;
    }

    public void setInvitedUsers(Set<Attendee> invitedUsers) {
        this.invitedUsers = invitedUsers;
    }

    public void addToInviteSet(Attendee attendee) {
        this.invitedUsers.add(attendee);
    }

    public boolean isInvitedUser(Attendee attendee) {
        return this.invitedUsers.contains(attendee);
    }

    public void clearInviteList() {
        this.invitedUsers.clear();
    }


    // Functions for isInviteOnly 
    public void setInviteOnlyStatus(boolean isInviteOnly) {
        this.isInviteOnly = isInviteOnly;
    }

    public boolean getInviteOnlyStatus() {
        return this.isInviteOnly;
    }

    @Override
    public String toString() {
        return "title: " + this.title + ", location: " + this.location;
    }

}
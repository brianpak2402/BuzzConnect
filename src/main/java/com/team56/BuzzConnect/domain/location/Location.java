package com.team56.BuzzConnect.domain.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team56.BuzzConnect.domain.event.Event;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="location_id")
    private int id;
    
    @Column(name="latitude")
    private double latitude;

    @Column(name="longitude")
    private double longitude;

    @Column(name="name", unique = true)
    private String name;

    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REFRESH })
    @JsonIgnore
    private List<Event> eventsAtLocation;

    // Constructor
    public Location() {
        this.latitude = 0;
        this.longitude = 0;
        this.name = "";
        this.eventsAtLocation = new ArrayList<>();
    }

    public Location(String name, double latitude, double longitude) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Functions for name 
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Functions for latitude
    public double getLatitude() {
        return this.latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    // Functions for longitude
    public double getLongitude() {
        return this.longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    // Functions for eventsAtLocation
    public List<Event> getEventsAtLocation() {
        return this.eventsAtLocation;
    }

    public void setEventsAtLocation(List<Event> events) {
        this.eventsAtLocation = events;
    }

    public void addEventToLocation(Event event) {
        this.eventsAtLocation.add(event);
    }

    public void removeEventAtLocation(Event event) {
        this.eventsAtLocation.remove(event);
    }

    public void clearAllEventsAtLocation() {
        this.eventsAtLocation.clear();
    }
}
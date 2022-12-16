package com.team56.BuzzConnect.controller;

import com.team56.BuzzConnect.domain.location.Location;
import com.team56.BuzzConnect.domain.event.Event;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.team56.BuzzConnect.repository.EventRepository;
import com.team56.BuzzConnect.repository.LocationRepository;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/buzzconnect/locations") 
public class LocationController {
    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private EventRepository eventRepository;
    
    @GetMapping(path="/all")
    public ResponseEntity<Iterable<Location>> getAllLocations() {
        return new ResponseEntity<>(locationRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(path="/info/{locationId}")
    public ResponseEntity<Location> getLocation(@PathVariable("locationId") int locationId) {
        Optional<Location> locationQuery = locationRepository.findById(locationId);
        if (locationQuery.isPresent()) {
           return new ResponseEntity<>(locationQuery.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path="/search")
    public ResponseEntity<List<Location>> searchLocation(@RequestParam String query) {
        List<Location> locations = locationRepository.findAllByName(query);

        if (locations != null) {
            return new ResponseEntity<>(locations, HttpStatus.OK);
        } else {
            // Default location of none is found
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @PostMapping(path="/create")
    public ResponseEntity<Location> createLocation(@RequestParam Map<String, String> map) {
        double latitude = Double.valueOf(map.get("longitude")), longitude = Double.valueOf(map.get("latitude"));
        Location location = new Location(map.get("name"), latitude, longitude);

        locationRepository.save(location);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @PostMapping(path="/:locationId/addEvent")
    public ResponseEntity<Location> addEventToLocation(@PathVariable("locationId") int locationId, Map<String, String> map) {
        int eventId = Integer.valueOf(map.get("eventId"));
        Event event = eventRepository.findById(eventId).orElseThrow(null);
        Location location = locationRepository.findById(locationId).orElseThrow(null);
        
        location.addEventToLocation(event);
        locationRepository.save(location);

        event.setLocation(location);
        eventRepository.save(event);

        return new ResponseEntity<>(locationRepository.findById(locationId).get(), HttpStatus.OK);
    }

}

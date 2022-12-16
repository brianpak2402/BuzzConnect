package com.team56.BuzzConnect.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.team56.BuzzConnect.domain.user.*;
import com.team56.BuzzConnect.domain.event.*;
import com.team56.BuzzConnect.repository.*;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/buzzconnect/attendees") 
public class AttendeeController {
  @Autowired
  private AttendeeRepository attendeeRepository;

  @PostMapping(path="/create")
  public ResponseEntity<Attendee> addNewAttendee(@RequestParam Map<String,String> map) {
    // Check if username is unique.
    if (attendeeRepository.findAllUsernames().contains(map.get("username"))) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    } 

    Attendee user = new Attendee(map.get("username"), map.get("password"));
    user.setUserType("Attendee");
    attendeeRepository.save(user);
    return new ResponseEntity<Attendee>(user, HttpStatus.OK);
  }

  @GetMapping(path="/info/{attendeeId}")
  public ResponseEntity<Attendee> getAttendeeInfo(@PathVariable("attendeeId") int attendeeId) {
    Attendee attendee =  attendeeRepository.findById(attendeeId).orElseThrow(null);
    return new ResponseEntity<>(attendee, HttpStatus.OK);
  }

  @GetMapping(path="/all")
  public @ResponseBody Iterable<Attendee> getAllAttendees() {
    return attendeeRepository.findAll();
  }

  @GetMapping(path="/{attendeeId}/events")
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody Iterable<Event> getAttendingEvents(@PathVariable("attendeeId") int attendeeId) {
    Attendee attendee = attendeeRepository.findById(attendeeId).orElseThrow(null);
    
    List<Event> allEvents = new ArrayList<>();
    allEvents.addAll(attendee.getWillAttendEvents());
    allEvents.addAll(attendee.getMightAttendEvents());
    return allEvents;
  }

  @GetMapping(path="/{attendeeId}/events/invited") // alex
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody Iterable<Event> getEventsInvitedTo(@PathVariable("attendeeId") int attendeeId) {
    Attendee attendee = attendeeRepository.findById(attendeeId).orElseThrow(null);
    List<Event> eventsInvitedTo = new ArrayList<>();
    eventsInvitedTo.addAll(attendee.getInvitedEvents());
    return eventsInvitedTo;
  }
}
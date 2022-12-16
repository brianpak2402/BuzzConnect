package com.team56.BuzzConnect.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.team56.BuzzConnect.domain.event.Event;
import com.team56.BuzzConnect.domain.location.Location;
import com.team56.BuzzConnect.domain.user.*;
import com.team56.BuzzConnect.repository.*;

@RestController 
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping(path="/buzzconnect/events") 
public class EventController {
  @Autowired 
  private EventRepository eventRepository;

  @Autowired
  private HostRepository hostRepository;

  @Autowired
  private AttendeeRepository attendeeRepository;

  @Autowired
  private AdminRepository adminRepository;

  @Autowired
  private LocationRepository locationRepository;

  @PostMapping(path="/create",
               consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<Event> addEvent (@RequestParam Map<String, String> map, 
          @RequestParam("dateTime") @DateTimeFormat(pattern = "MM-dd-yyyy' 'hh:mm a") LocalDateTime dateTime) {
      Host host = hostRepository.findById(Integer.valueOf(map.get("hostId"))).orElseThrow(null);
      Location location = locationRepository.findAllByName(map.get("location")).get(0);

      Event event = eventRepository.findEventByTitle(map.get("title"));
      if (event == null) {
        event = new Event(map.get("title"), location, dateTime, map.get("description"), 
                            Integer.valueOf(map.get("maxCapacity")), Boolean.parseBoolean(map.get("isInviteOnly")), host);
        eventRepository.save(event);
        return new ResponseEntity<>(event, HttpStatus.OK);
      } else {
        return new ResponseEntity<Event>(event, HttpStatus.OK);
      }
    } 

  @PostMapping(path="/edit/{eventId}",
               consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
  public ResponseEntity<Event> editEvent(@RequestParam Map<String, String> map, @PathVariable("eventId") int eventId,
        @RequestParam(name = "dateTime", required = false) @DateTimeFormat(pattern = "MM-dd-yyyy' 'hh:mm a") LocalDateTime dateTime) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    String title = map.get("title");
    Location location = locationRepository.findAllByName(map.get("location")).get(0);
    String description = map.get("description");
    boolean isInviteOnly = Boolean.parseBoolean(map.get("isInviteOnly"));

    if (title != "") {
      event.setTitle(title);
    }

    if (location != null){
      event.setLocation(location);
    }

    if (dateTime != null) {
      event.setDateTime(dateTime);
    }

    if (description != "") {
      event.setDescription(description);
    }

    if (map.get("maxCapacity") != "") {
      event.setMaxCapacity(Integer.parseInt(map.get("maxCapacity")));
    }

    if (map.get("isInviteOnly") != "") {
      event.setInviteOnlyStatus(isInviteOnly);
    }

    eventRepository.save(event);
    return new ResponseEntity<Event>(event, HttpStatus.OK);
  }

  @GetMapping(path="/all")
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody Iterable<Event> getAllEvents() {
    Set<Event> events= new HashSet<>();
    for (Event e: eventRepository.findAll()) {
      events.add(e);
    }
    return events;
  }

  @GetMapping(path="/viewpoint/{id}")
  public @ResponseBody Iterable<Event> getAllEventForUser(@PathVariable("id") int id) {
    // Determine what kind of user is making the API call
    Optional<Host> host = hostRepository.findById(id);
    Optional<Attendee> attendee = attendeeRepository.findById(id);
    Optional<Administrator> admin = adminRepository.findById(id);
    // Depending on the user, modify the resulting events list
    if (host.isPresent()) {
      // The user is a host.
      for (Event e : eventRepository.findAll()) {
        if (id == e.getHost().getId()) {
          e.setIsOwner(true);
          e.setUserType("Host");
        } else {
          e.setIsOwner(false);
          e.setUserType("Host");
        }
        e.setIsUserInvited(false);
        eventRepository.save(e);
      }
    } else if (attendee.isPresent()) {
      // The user is an attendee.
      for (Event e : eventRepository.findAll()) {
        e.setIsOwner(false);
        e.setUserType("Attendee");
        if (e.getInviteOnlyStatus() == true) {
          if (e.isInvitedUser(attendee.get())) {
            e.setIsUserInvited(true);
          } else {
            e.setIsUserInvited(false);
          }
        } else {
          e.setIsUserInvited(true);
        }
      }
    } else if (admin.isPresent()) {
      // The user is an admin.
      for (Event e : eventRepository.findAll()) {
        e.setIsOwner(true);
        e.setIsUserInvited(false);
        e.setUserType("Moderator");
        eventRepository.save(e);
      }
    } else {
      throw new NoSuchElementException("User with id " + id + " does not exist.");
    }
    return eventRepository.findAll();
  } 

  @GetMapping(path="/all/{hostId}")
  public @ResponseBody Iterable<Event> getHostEvents(@PathVariable("hostId") int hostId) {
    return eventRepository.findHostEventsByHostId(hostId);
  }

  @GetMapping(path="/info/{eventId}")
  public Event getEvent (@PathVariable("eventId") int eventId) {
    Event event = eventRepository.findById(eventId).orElseThrow(
      () -> new IllegalArgumentException("Can not find an event with this id " + eventId)
    );
    event.setCurrentCapacity();
    return event;
  }


  @DeleteMapping(path="/remove/{eventId}")
  public ResponseEntity<Boolean> removeEvent(@RequestParam Map<String, Object> map, @PathVariable("eventId") int eventId) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    Host host = event.getHost();

    // Detach the host.
    host.removeEvent(event);
    hostRepository.save(host);

    // Detach the RSVP'd attendees
    for (Attendee a : event.getAllAttendees()) {
        a.removeEventRSVP(event);
        attendeeRepository.save(a);
    }
    event.clearAllAttendeeRSVP();

    for (Attendee a : event.getInvitedUsers()) {
      a.removeInvitedEvent(event);
      attendeeRepository.save(a);
    }
    event.clearInviteList();


    eventRepository.save(event);
    eventRepository.deleteById(eventId);
    return new ResponseEntity<>(true, HttpStatus.OK);
  }

  @GetMapping(path="/{eventId}/attendees/all")
  @ResponseStatus(HttpStatus.OK)
  public @ResponseBody Set<Attendee> getAllAttendees (@PathVariable("eventId") int eventId) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    return event.getAllAttendees();
  }

  @GetMapping(path="/{eventId}/attendees/willAttend")
  public ResponseEntity<Set<Attendee>> getWillAttendUsers(@PathVariable("eventId") int eventId) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    return new ResponseEntity<>(event.getWillAttendUsers(), HttpStatus.OK);
  }

  @GetMapping(path="/{eventId}/attendees/mightAttend")
  public ResponseEntity<Set<Attendee>> getMightAttendAttendUsers(@PathVariable("eventId") int eventId) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    return new ResponseEntity<>(event.getMightAttendUsers(), HttpStatus.OK);
  }

  @GetMapping(path="/{eventId}/attendees/willNotAttend")
  public ResponseEntity<Set<Attendee>> getWillNotAttendUsers(@PathVariable("eventId") int eventId) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    return new ResponseEntity<>(event.getWillNotAttendUsers(), HttpStatus.OK);
  }

  @PostMapping(path="/{eventId}/rsvp/request")
  public ResponseEntity<Event> rsvpToEvent(@PathVariable("eventId") int eventId, @RequestParam Map<String, String> map) {
    // Retrieve the event, attendee, and their newRSVP status.
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    Attendee attendee = attendeeRepository.findById(Integer.valueOf(map.get("attendeeId"))).orElseThrow(null);
    String newRSVP = map.get("rsvpStatus");
    
    // If the attendee has previously RSVP'd for the event, remove the old RSVP status
    if (event.containsAttendeeRSVP(attendee)) {
      event.removeAttendeeRSVP(attendee);
    }

    // Update the RSVP sets and save entry to the database.
    if (!newRSVP.equals("removingRSVPStatus")) {
      event.addAttendeeRSVP(attendee, newRSVP);
      attendee.addEventRSVP(event, newRSVP);
    }

    event.setCurrentCapacity();
    eventRepository.save(event);
    attendeeRepository.save(attendee);
    return new ResponseEntity<>(event, HttpStatus.OK);
  }

  @PostMapping(path="/{eventId}/rsvp/remove")
  public ResponseEntity<Event> removeRSVP(@PathVariable("eventId") int eventId, @RequestParam Map<String, String> map) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    Attendee attendee = attendeeRepository.findById(Integer.valueOf(map.get("attendeeId"))).orElseThrow(null);

    if (event.containsAttendeeRSVP(attendee)) {
      event.removeAttendeeRSVP(attendee);
      event.setCurrentCapacity();
      eventRepository.save(event);
      return new ResponseEntity<>(event, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping(path="/{eventId}/is_invite_only/{status}")
  public ResponseEntity<Event> setInviteOnly(@PathVariable("eventId") int eventId, @PathVariable boolean status) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    event.setInviteOnlyStatus(status);
    eventRepository.save(event);
    return new ResponseEntity<Event>(event, HttpStatus.OK);
  }

  @GetMapping(path="/{eventId}/is_invite_only")
  public ResponseEntity<Boolean> isInviteOnly(@PathVariable("eventId") int eventId) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    return new ResponseEntity<>(event.getInviteOnlyStatus(), HttpStatus.OK);
  }

  @PostMapping(path="/{eventId}/set_invite_list/{invitees}")
  public ResponseEntity<Event> setInviteList(@PathVariable("eventId") int eventId, @PathVariable("invitees") Set<Integer> invitees) {
    Event event = eventRepository.findById(eventId).orElseThrow(null);
    if (event.getInviteOnlyStatus()) {
      for (Integer inviteeId : invitees) {
        Attendee attendee = attendeeRepository.findById(inviteeId).orElseThrow(null);
        attendee.addEventAsInvited(event);
        attendeeRepository.save(attendee);
        event.addToInviteSet(attendee);
      } 
      eventRepository.save(event);
      return new ResponseEntity<>(event, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
  }
}
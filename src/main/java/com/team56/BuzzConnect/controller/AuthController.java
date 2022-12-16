package com.team56.BuzzConnect.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.team56.BuzzConnect.domain.user.*;
import com.team56.BuzzConnect.repository.*;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/buzzconnect/auth") 
public class AuthController {
  @Autowired 
  private HostRepository hostRepository;

  @Autowired 
  private AttendeeRepository attendeeRepository;

  @Autowired 
  private AdminRepository adminRepository;

  /**
   * Determines whether the given user credentials is valid for login
   * @param username the username of the Host 
   * @param password the password of the given Host 
   * @return true if the given user credentials are valid and false otherwise.
   */
  @PostMapping(path="/login",
               consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
  public ResponseEntity<? extends User> login(@RequestParam Map<String, String> map) {
    Optional<Host> host = hostRepository.findByUsername(map.get("username"));
    Optional<Attendee> attendee = attendeeRepository.findByUsername(map.get("username"));
    Optional<Administrator> admin = adminRepository.findByUsername(map.get("username"));

    if (host.isPresent()) {
        if (map.get("password").equals(host.get().getPassword())) {
            return new ResponseEntity<Host>(host.get(), HttpStatus.OK);
        } 
    } else if (attendee.isPresent()) {
        if (map.get("password").equals(attendee.get().getPassword())) {
            return new ResponseEntity<Attendee>(attendee.get(), HttpStatus.OK);
        } 
    } else if (admin.isPresent()) {
        if (map.get("password").equals(admin.get().getPassword())) {
            return new ResponseEntity<Administrator>(admin.get(), HttpStatus.OK);
        } 
    } 
    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
  }

}
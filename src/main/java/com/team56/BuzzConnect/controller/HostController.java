package com.team56.BuzzConnect.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.team56.BuzzConnect.domain.user.*;
import com.team56.BuzzConnect.repository.*;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/buzzconnect/hosts") 
public class HostController {
  @Autowired 
  private HostRepository hostRepository;

  @PostMapping(path="/create",
               consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
  public ResponseEntity<Host> addNewHost(@RequestParam Map<String, String> map) {
    // Check if username is unique
    if (hostRepository.findAllUsernames().contains(map.get("username"))) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    } 

    Host user = new Host(map.get("username"), map.get("password"));
    user.setUserType("Host");
    hostRepository.save(user);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping(path="/all")
  public ResponseEntity<Iterable<Host>> getAllHosts() {
    return new ResponseEntity<>(hostRepository.findAll(), HttpStatus.OK);
  }
}
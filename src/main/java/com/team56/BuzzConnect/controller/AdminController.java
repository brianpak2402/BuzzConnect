package com.team56.BuzzConnect.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team56.BuzzConnect.domain.user.*;
import com.team56.BuzzConnect.repository.*;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@RequestMapping(path="/buzzconnect/admins") 
public class AdminController {
  @Autowired
  private AdminRepository adminRepository;

  /**
   * Creates a new administrator user and stores it into the database
   * @param username the username for the new admin
   * @param password the new admin's password
   * @return a String showing successful creation and storage of the user
   */
  @PostMapping(path="/create",
               consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
  public ResponseEntity<Administrator> addNewAdmin(@RequestParam Map<String,String> map) {
    // Check if username is unique 
    if (adminRepository.findAllUsernames().contains(map.get("username"))) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    } 

    Administrator user = new Administrator(map.get("username"), map.get("password"));
    user.setUserType("Moderator");
    adminRepository.save(user);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  /**
   * Lists of all the registered Administrators currently in the database
   * @return a list of JSON objects, each representing a registered Administrator user. 
   */
  @GetMapping(path="/all")
  public @ResponseBody Iterable<Administrator> getAllAdministrators() {
    return adminRepository.findAll();
  }
}
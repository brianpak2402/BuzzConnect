package com.team56.BuzzConnect.domain.user;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@MappedSuperclass
public abstract class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  @Column(name="username")
  private String username;

  @Column(name="password")
  private String password;

  @Column(name="userType")
  private String userType;

  // Constructors
  public User() {
    this.username = "";
    this.password = "";
  }

  public User(String username, String password) {
    this.username = username;
    this.password = password;
  }

  // Functions for id
  public int getId() {
    return this.id;
  }

  // Functions for username
  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  // Functions for password
  @JsonIgnore
  @JsonProperty(value = "password")
  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUserType() {
    return this.userType;
  }

  public void setUserType(String userType) {
    this.userType = userType;
  }

  @Override
  public String toString() {
    return this.userType + " = " + " username: " + username + " " + "password: " + password;
  }
}
package com.team56.BuzzConnect.repository;

import javax.transaction.Transactional;

import com.team56.BuzzConnect.domain.user.Attendee;

@Transactional
public interface AttendeeRepository extends UserRepository<Attendee> {
}


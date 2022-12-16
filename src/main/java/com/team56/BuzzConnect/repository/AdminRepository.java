package com.team56.BuzzConnect.repository;

import javax.transaction.Transactional;

import com.team56.BuzzConnect.domain.user.Administrator;

@Transactional
public interface AdminRepository extends UserRepository<Administrator> {
}
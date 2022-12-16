package com.team56.BuzzConnect.repository;

import javax.transaction.Transactional;

import com.team56.BuzzConnect.domain.user.Host;

@Transactional
public interface HostRepository extends UserRepository<Host> {
}


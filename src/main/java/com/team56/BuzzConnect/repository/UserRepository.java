package com.team56.BuzzConnect.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.team56.BuzzConnect.domain.user.User;

@NoRepositoryBean
public interface UserRepository<T extends User> extends CrudRepository<T, Integer> {
    @Modifying
    @Query(value="SELECT username FROM host UNION SELECT username FROM attendee UNION SELECT username from administrator", nativeQuery = true)
    public Set<String> findAllUsernames();

    @Modifying
    @Query(value="SELECT password FROM host UNION SELECT password FROM attendee UNION SELECT password from administrator", nativeQuery = true)
    public Set<String> findAllPasswords();

    public Optional<T> findByUsername(String username);
}


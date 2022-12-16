package com.team56.BuzzConnect.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.CrudRepository;

import com.team56.BuzzConnect.domain.event.Event;

public interface EventRepository extends CrudRepository<Event, Integer> {
    @Modifying
    @Query(value="SELECT * FROM event INNER JOIN host WHERE host.host_id = :id", nativeQuery = true)
    Set<Event> findHostEventsByHostId(@Param("id") int id);

    Event findEventByTitle(String title);
}



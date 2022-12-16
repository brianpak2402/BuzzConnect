package com.team56.BuzzConnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.team56.BuzzConnect.domain.location.Location;;

public interface LocationRepository extends CrudRepository<Location, Integer> {
    Optional<Location> findByName(String name);

    @Modifying
    @Query(value = "SELECT * FROM location WHERE name LIKE %:query%", nativeQuery = true)
    List<Location> findAllByName(@Param("query") String query);
}



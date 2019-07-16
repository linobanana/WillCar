package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.RatedPassenger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatedPassengerRepository extends JpaRepository<RatedPassenger, Long> {
    List<RatedPassenger> findByDriveId(Long driveId);
}

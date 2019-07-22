package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Drive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface DriveRepository extends JpaRepository<Drive, Long> {

    /*@Query(value = "SELECT d " +
            "from PassengerDrive d " +
            "left join fetch d.drive dr  " +
           // "left join fetch d.passengers ps " +
            "where dr.driverId = :driverId"
           *//* "join fetch ps.passenger p\n" +
            "join fetch p.passengerMark m\n" +
            "where dr.id = :driverId" +
            " and m.driveId = d.id and m.ratedRole = 'PASSENGER'"*//*)*/
    List<Drive> findAllByDriverId(Long driverId);

    List<Drive> findAllByStartTime(LocalDateTime startTime);

    List<Drive> findDrivesByStartPoint(Double startPoint);

}
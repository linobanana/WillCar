package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.PassengerDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PassengerDriveRepository extends JpaRepository<PassengerDrive, Long> {

    @Query(value = "SELECT d " +
            "from PassengerDrive d " +
            "left join fetch d.drive dr  " +
            "left join fetch dr.driver driver  " +
            "where driver.id = :driverId")
    List<PassengerDrive> findAllByDriverId(Long driverId);


    @Query(value = "SELECT d " +
            "from PassengerDrive d " +
            "left join fetch d.passenger p  " +
            "where p.id = :passengerId")
    List<PassengerDrive> findAllByPassengerId(Long passengerId);

    @Query(value = "SELECT d " +
            "from PassengerDrive d " +
            "where drive_id = :driveId and passenger_id = :passengerId")
    PassengerDrive getByDriveAndPassengerId(Long driveId, Long passengerId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE PassengerDrive set driver_to_passenger_mark = :mark " +
            "where drive_id = :driveId and passenger_id = :passengerId")
    void addMarkDriverToPassenger(int mark, Long driveId, Long passengerId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE PassengerDrive set passenger_to_driver_mark = :mark " +
            "where drive_id = :driveId and passenger_id = :passengerId")
    void addMarkPassengerToDriver(int mark, Long driveId, Long passengerId);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM PassengerDrive " +
            "where drive_id = :driveId ")
    void deleteByDriveId(Long driveId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM PassengerDrive " +
            "where drive_id = :driveId and passenger_id = :passengerId ")
    void deleteByDriveAndPassengerId(Long driveId, Long passengerId);
}

package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.PassengerDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PassengerDriveRepository extends JpaRepository<PassengerDrive, Long> {


    @Query(value = "SELECT d " +
            "from PassengerDrive d " +
            "left join fetch d.passenger p  " +
            "where p.id = :passengerId")
    List<PassengerDrive> findAllByPassengerId(Long passengerId);
}

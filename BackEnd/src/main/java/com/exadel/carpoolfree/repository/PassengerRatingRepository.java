package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.PassengerRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassengerRatingRepository extends JpaRepository<PassengerRating, Long> {
    List<PassengerRating> findByDriveId(Long driveId);
}

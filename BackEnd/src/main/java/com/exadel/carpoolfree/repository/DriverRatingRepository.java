package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.DriverRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRatingRepository extends JpaRepository<DriverRating, Long> {
    DriverRating findByDriveId(Long driveId);
}

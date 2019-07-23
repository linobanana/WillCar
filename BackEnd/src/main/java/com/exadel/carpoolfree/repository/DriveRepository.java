package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Drive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DriveRepository extends JpaRepository<Drive, Long> {

    List<Drive> findAllByStartTime(LocalDateTime startTime);

    List<Drive> findDrivesByStartPoint(Double startPoint);

}

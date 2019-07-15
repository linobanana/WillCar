package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Drive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DriveRepository extends JpaRepository<Drive, Long> {
    List<Drive> findAllByStartTime(String startTime);

    List<Drive> findAllByStartPoint(Double startPoint);
}
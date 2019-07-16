package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.RatedDriver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatedDriverRepository extends JpaRepository<RatedDriver, Long> {
    RatedDriver findByDriveId(Long driveId);
}

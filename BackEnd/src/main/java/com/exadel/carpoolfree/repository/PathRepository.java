package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Path;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathRepository extends JpaRepository<Path, Long> {
    String getCoordinatesById(Long id);

    String getCoordinatesByStartPoint(Double startPoint);
}

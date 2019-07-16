package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Path;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathRepository extends JpaRepository<Path, Long> {
    Path getPathByStartPoint(Double startPoint);
}

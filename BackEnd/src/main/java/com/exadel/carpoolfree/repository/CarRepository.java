package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {
}

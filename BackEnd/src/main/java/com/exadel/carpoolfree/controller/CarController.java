package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.Car;
import com.exadel.carpoolfree.repository.CarRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/car")
public class CarController {

    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @GetMapping("/userId/{userId}")
    public List<Car> getAllCars(@PathVariable Long userId) {
        return carRepository.findAllByUserId(userId);
    }

    @PostMapping()
    public Car addCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
       carRepository.deleteById(id);
    }

}

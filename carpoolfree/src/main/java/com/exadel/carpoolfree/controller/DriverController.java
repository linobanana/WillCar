package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.Driver;
import com.exadel.carpoolfree.repository.DriverRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/driver")
public class DriverController {


    private final DriverRepository driverRepository;

    public DriverController(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @GetMapping()
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    @GetMapping("/first-name/{firstName}")
    public List<Driver> getByFirstName(final @PathVariable String firstName) {
        return driverRepository.findAllByFirstName(firstName);
    }

    @PostMapping()
    public Driver addRule(@RequestBody Driver rule) {
        return driverRepository.save(rule);
    }

}

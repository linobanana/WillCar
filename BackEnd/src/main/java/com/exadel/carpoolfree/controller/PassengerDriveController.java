package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.repository.PassengerDriveRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/passenger")
public class PassengerDriveController {
    private final PassengerDriveRepository passengerDriveRepository;

    public PassengerDriveController(PassengerDriveRepository passengerDriveRepository) {
        this.passengerDriveRepository = passengerDriveRepository;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public void addPassenger(@RequestBody PassengerDrive passengerDrive) {
        passengerDriveRepository.save(passengerDrive);

    }
}


package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.repository.PassengerDriveRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/passenger")
public class PassengerDriveController {
    private final PassengerDriveRepository passengerDriveRepository;

    public PassengerDriveController(PassengerDriveRepository passengerDriveRepository) {
        this.passengerDriveRepository = passengerDriveRepository;
    }

    @PostMapping()
    public PassengerDrive addPassenger(@RequestBody PassengerDrive passengerDrive) {
        PassengerDrive save = passengerDriveRepository.save(passengerDrive);
        return save;
    }
}

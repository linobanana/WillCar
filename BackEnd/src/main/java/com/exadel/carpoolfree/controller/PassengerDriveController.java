package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.view.MarkVO;
import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.repository.PassengerDriveRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/markToPassenger")
    public void addMarkDriverToPassenger(@RequestBody MarkVO markVO){
        passengerDriveRepository.addMarkDriverToPassenger(markVO.getMark(),
                markVO.getDriveId(), markVO.getPassengerId());
    }

    @PostMapping("/markToDriver")
    public void addMarkPassengerToDriver(@RequestBody MarkVO markVO){
        passengerDriveRepository.addMarkPassengerToDriver(markVO.getMark(),
                markVO.getDriveId(), markVO.getPassengerId());
    }
}


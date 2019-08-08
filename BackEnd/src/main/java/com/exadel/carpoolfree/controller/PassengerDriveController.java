package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.model.view.MarkVO;
import com.exadel.carpoolfree.service.PassengerDriveService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/passengerDrive")
public class PassengerDriveController {
    private final PassengerDriveService passengerDriveService;

    public PassengerDriveController(PassengerDriveService passengerDriveService) {
        this.passengerDriveService = passengerDriveService;
    }

    @PostMapping("/passenger")
    public boolean addPassenger(@RequestBody PassengerDrive passengerDrive) {
      return  passengerDriveService.addPassenger(passengerDrive);
    }

    @PostMapping("/driver/markToPassenger")
    public int addMarkDriverToPassenger(@RequestBody MarkVO markVO){
        return passengerDriveService.addMarkDriverToPassenger(markVO);
    }

    @PostMapping("/passenger/markToDriver")
    public int addMarkPassengerToDriver(@RequestBody MarkVO markVO){
       return  passengerDriveService.addMarkPassengerToDriver(markVO);
    }

    @DeleteMapping("/passenger/{passengerId}/driveId/{driveId}")
    public void delete(final @PathVariable Long driveId, final @PathVariable Long passengerId) {
        passengerDriveService.delete(driveId, passengerId);
    }

}


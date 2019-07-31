package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.model.view.MarkVO;
import com.exadel.carpoolfree.repository.DriveRepository;
import com.exadel.carpoolfree.repository.PassengerDriveRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/passenger")
public class PassengerDriveController {
    private final PassengerDriveRepository passengerDriveRepository;
    private final DriveRepository driveRepository;


    public PassengerDriveController(PassengerDriveRepository passengerDriveRepository, DriveRepository driveRepository) {
        this.passengerDriveRepository = passengerDriveRepository;
        this.driveRepository = driveRepository;
    }

    @PostMapping()
    public void addPassenger(@RequestBody PassengerDrive passengerDrive) {
        PassengerDrive ps1 = passengerDriveRepository.getByDriveAndPassengerId(passengerDrive.getDrive().getId(), passengerDrive.getPassenger().getId());
        if (ps1 == null) {
            PassengerDrive ps = passengerDriveRepository.save(passengerDrive);
            int places = ps.getDrive().getFreePlaceCount();
            if (places > 0 && ps.getPassenger().getId() != ps.getDrive().getDriver().getId()) {
                places--;
                ps.getDrive().setFreePlaceCount(places);
                driveRepository.save(ps.getDrive());
            } else {
                passengerDriveRepository.deleteByDriveAndPassengerId(ps.getDrive().getId(), ps.getPassenger().getId());
            }
        } else {
            new RuntimeException("Passenger already booked this drive");
        }
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

    @DeleteMapping("{passengerId}/driveId/{driveId}")
    public void delete(final @PathVariable Long driveId, final @PathVariable Long passengerId) {
        PassengerDrive ps = passengerDriveRepository.getByDriveAndPassengerId(driveId, passengerId);
        int places = ps.getDrive().getFreePlaceCount();
        places++;
        ps.getDrive().setFreePlaceCount(places);
        driveRepository.save(ps.getDrive());
        passengerDriveRepository.deleteByDriveAndPassengerId(driveId, passengerId);
    }

}


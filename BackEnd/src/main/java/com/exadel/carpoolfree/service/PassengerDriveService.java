package com.exadel.carpoolfree.service;

import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.model.view.MarkVO;
import com.exadel.carpoolfree.repository.DriveRepository;
import com.exadel.carpoolfree.repository.PassengerDriveRepository;
import org.springframework.stereotype.Service;

@Service
public class PassengerDriveService {

    private final PassengerDriveRepository passengerDriveRepository;
    private final DriveRepository driveRepository;


    public PassengerDriveService(PassengerDriveRepository passengerDriveRepository, DriveRepository driveRepository) {
        this.passengerDriveRepository = passengerDriveRepository;
        this.driveRepository = driveRepository;
    }

    public void addPassenger(PassengerDrive passengerDrive) {
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

    public void addMarkDriverToPassenger(MarkVO markVO) {
        passengerDriveRepository.addMarkDriverToPassenger(markVO.getMark(),
                markVO.getDriveId(), markVO.getPassengerId());
    }

    public void addMarkPassengerToDriver(MarkVO markVO) {
        passengerDriveRepository.addMarkPassengerToDriver(markVO.getMark(),
                markVO.getDriveId(), markVO.getPassengerId());
    }

    public void delete(Long driveId, Long passengerId) {
        PassengerDrive ps = passengerDriveRepository.getByDriveAndPassengerId(driveId, passengerId);
        int places = ps.getDrive().getFreePlaceCount();
        places++;
        ps.getDrive().setFreePlaceCount(places);
        driveRepository.save(ps.getDrive());
        passengerDriveRepository.deleteByDriveAndPassengerId(driveId, passengerId);
    }
}

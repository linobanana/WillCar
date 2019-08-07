package com.exadel.carpoolfree.service;

import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.model.User;
import com.exadel.carpoolfree.model.view.MarkVO;
import com.exadel.carpoolfree.repository.DriveRepository;
import com.exadel.carpoolfree.repository.PassengerDriveRepository;
import com.exadel.carpoolfree.repository.UserRepository;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PassengerDriveService {

    private final PassengerDriveRepository passengerDriveRepository;
    private final DriveRepository driveRepository;
    private final UserRepository userRepository;


    public PassengerDriveService(PassengerDriveRepository passengerDriveRepository, DriveRepository driveRepository, UserRepository userRepository) {
        this.passengerDriveRepository = passengerDriveRepository;
        this.driveRepository = driveRepository;
        this.userRepository = userRepository;
    }

    public boolean addPassenger(PassengerDrive passengerDrive) {
        PassengerDrive ps1 = passengerDriveRepository.getByDriveAndPassengerId(passengerDrive.getDrive().getId(), passengerDrive.getPassenger().getId());
        if (ps1 == null) {
            PassengerDrive ps = passengerDriveRepository.save(passengerDrive);
            int places = ps.getDrive().getFreePlaceCount();
            if (places > 0 && ps.getPassenger().getId() != ps.getDrive().getDriver().getId()) {
                places--;
                ps.getDrive().setFreePlaceCount(places);
                driveRepository.save(ps.getDrive());
                return true;
            } else {
                passengerDriveRepository.deleteByDriveAndPassengerId(ps.getDrive().getId(), ps.getPassenger().getId());
            }
        } else {
            throw new RuntimeException("Passenger already booked this drive");
        }
        return false;
    }

    public int addMarkDriverToPassenger(MarkVO markVO) {
        passengerDriveRepository.addMarkDriverToPassenger(markVO.getMark(),
                markVO.getDriveId(), markVO.getPassengerId());
        User passenger = userRepository.findById(markVO.getPassengerId()).get();
        passenger.setPassengerRating((passenger.getPassengerRating() + markVO.getMark()) / 2);
        userRepository.save(passenger);
        return markVO.getMark();
    }

    public int addMarkPassengerToDriver(MarkVO markVO) {
        passengerDriveRepository.addMarkPassengerToDriver(markVO.getMark(),
                markVO.getDriveId(), markVO.getPassengerId());
        User driver = driveRepository.findById(markVO.getDriveId()).get().getDriver();
        driver.setDriverRating((driver.getDriverRating() + markVO.getMark()) / 2);
        userRepository.save(driver);
        return markVO.getMark();
    }

    public void delete(Long driveId, Long passengerId) {
        PassengerDrive ps = passengerDriveRepository.getByDriveAndPassengerId(driveId, passengerId);
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String login = securityContext.getAuthentication().getName();
        User checkUser = userRepository.findByLogin(login);
        if (checkUser.getId() == passengerId) {
            int places = ps.getDrive().getFreePlaceCount();
            places++;
            ps.getDrive().setFreePlaceCount(places);
            driveRepository.save(ps.getDrive());
            passengerDriveRepository.deleteByDriveAndPassengerId(driveId, passengerId);
        } else {
            throw new RuntimeException("Incorrect user");
        }
    }
}

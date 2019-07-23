package com.exadel.carpoolfree.service;

import com.exadel.carpoolfree.model.Drive;
import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DriveService {


    public List<Drive> findAllByDriverId(final List<PassengerDrive> passengerDriveList) {
        Map<Drive, List<PassengerDrive>> driveListMap
                = passengerDriveList.stream()
                .collect(Collectors.groupingBy(PassengerDrive::getDrive));

        List<Drive> result = driveListMap.keySet().stream().map(drive -> {
            List<User> passengers = driveListMap.get(drive).stream().map(passengerDrive -> {
                User user = passengerDrive.getPassenger();
                return user;
            }).collect(Collectors.toList());
            drive.setPassengers(passengers);
            return drive;
        }).collect(Collectors.toList());
        return result;
    }

    public List<Drive> findAllByPassengerId(final  List<PassengerDrive> passengerDriveList) {
        List<Drive> result = passengerDriveList.stream()
                .map(temp -> {
                    Drive obj = temp.getDrive();
                    return obj;
                }).collect(Collectors.toList());

        return result;
    }
}

package com.exadel.carpoolfree.service;

import com.exadel.carpoolfree.model.Drive;
import com.exadel.carpoolfree.model.Message;
import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.model.Path;
import com.exadel.carpoolfree.model.view.DriveVO;
import com.exadel.carpoolfree.model.view.UserVO;
import com.exadel.carpoolfree.repository.DriveRepository;
import com.exadel.carpoolfree.repository.MessageRepository;
import com.exadel.carpoolfree.repository.PassengerDriveRepository;
import com.exadel.carpoolfree.repository.PathRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DriveService {

    private ModelMapper modelMapper = new ModelMapper();
    private final DriveRepository driveRepository;
    private final PassengerDriveRepository passengerDriveRepository;
    private final PathRepository pathRepository;
    private final MessageRepository messageRepository;


    public DriveService(DriveRepository driveRepository, PathRepository pathRepository,
                        PassengerDriveRepository passengerDriveRepository, MessageRepository messageRepository) {
        this.driveRepository = driveRepository;
        this.passengerDriveRepository = passengerDriveRepository;
        this.pathRepository = pathRepository;
        this.messageRepository = messageRepository;
    }

    public List<DriveVO> findAllDrives(){
        List<Drive> drives =  driveRepository.findAll();
        return drives.stream()
                .map(drive -> convertToVO(drive))
                .collect(Collectors.toList());
    }

    public DriveVO findById(final Long id) {
        return convertToVO(driveRepository.findById(id).get());
    }

    public List<DriveVO> findAllByUserId(final Long userId) {
        List<DriveVO> result = this.findAllByDriverId(userId);
        List<DriveVO> result2 = this.findAllByPassengerId(userId);
        result.addAll(result2);
        return result;
    }

    public List<DriveVO> findAllByDriverId(final Long driverId) {
        List<PassengerDrive> passengerDriveList = passengerDriveRepository.findAllByDriverId(driverId);
        Map<Drive, List<PassengerDrive>> driveListMap
                = passengerDriveList.stream()
                .collect(Collectors.groupingBy(PassengerDrive::getDrive));

        List<DriveVO> result = driveListMap.keySet().stream().map(drive -> {
            List<UserVO> passengers = driveListMap.get(drive).stream().map(passengerDrive -> {
                UserVO userVO = modelMapper.map(passengerDrive.getPassenger(), UserVO.class);
                userVO.setMark(passengerDrive.getDriverToPassengerMark());
                userVO.setPickUpPoint(passengerDrive.getStartPoint());
                return userVO;
            }).collect(Collectors.toList());
            List<Message> messages = messageRepository.findAllByDriveId(drive.getId());
            DriveVO driveVO = convertToVO(drive);
            driveVO.setPassengers(passengers);
            driveVO.setMessages(messages);
            return driveVO;
        }).collect(Collectors.toList());
        return result;
    }

    public List<DriveVO> findAllByPassengerId(final  Long passengerId) {
        List<PassengerDrive> passengerDriveList = passengerDriveRepository.findAllByPassengerId(passengerId);
        List<DriveVO> result = passengerDriveList.stream()
                .map(temp -> {
                    UserVO driverVO = modelMapper.map(temp.getDrive().getDriver(), UserVO.class);
                    List<Message> messages = messageRepository.findAllByDriveId(temp.getDrive().getId());
                    DriveVO driveVO = convertToVO(temp.getDrive());
                    driverVO.setMark(temp.getPassengerToDriverMark());
                    driveVO.setDriver(driverVO);
                    driveVO.setMessages(messages);
                    return driveVO;
                }).collect(Collectors.toList());

        return result;
    }

    public List<DriveVO> getDriveByStartPoint(final Double startPoint) {
        List<Drive> drives = driveRepository.findDrivesByStartPoint(startPoint);
        return drives.stream()
                .map(drive -> convertToVO(drive))
                .collect(Collectors.toList());
    }

    public List<DriveVO> findAllByStartTime(final String stTime) {
        LocalDateTime startTime = LocalDateTime.parse(stTime);
        List<Drive> drives = driveRepository.findAllByStartTime(startTime);
        return drives.stream()
                .filter(drive -> drive.getStartTime().isBefore(startTime.plusHours(1)) &&
                        drive.getStartTime().isAfter(startTime.minusHours(1)))
                .map(drive -> convertToVO(drive))
                .collect(Collectors.toList());
    }

    public DriveVO addDrive(Drive drive) {
        Path path = pathRepository.save(drive.getPath());
        drive.setPath(path);
        return convertToVO(driveRepository.save(drive));
    }

    public DriveVO updateDrive(Long id, Path path) {
        Path newPath = pathRepository.save(path);
        return driveRepository.findById(id)
                .map(drive1 -> {
                    drive1.setPath(newPath);
                    return convertToVO(driveRepository.save(drive1));
                })
                .orElseThrow((() -> new RuntimeException("Drive not found")));
    }

    public void deleteById(final Long id) {
        passengerDriveRepository.deleteByDriveId(id);
        driveRepository.deleteById(id);
    }

    private DriveVO convertToVO(Drive drive) {
        DriveVO driveVO = modelMapper.map(drive, DriveVO.class);
        return driveVO;
    }
}

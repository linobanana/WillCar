package com.exadel.carpoolfree.service;

import com.exadel.carpoolfree.model.Drive;
import com.exadel.carpoolfree.model.Message;
import com.exadel.carpoolfree.model.PassengerDrive;
import com.exadel.carpoolfree.model.view.DriveVO;
import com.exadel.carpoolfree.model.view.UserVO;
import com.exadel.carpoolfree.repository.DriveRepository;
import com.exadel.carpoolfree.repository.MessageRepository;
import com.exadel.carpoolfree.repository.PassengerDriveRepository;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DriveService {

    private ModelMapper modelMapper = new ModelMapper();
    private final DriveRepository driveRepository;
    private final PassengerDriveRepository passengerDriveRepository;
    private final MessageRepository messageRepository;
    private final ChatService chatService;
    private final NotificationService notificationService;


    public DriveService(DriveRepository driveRepository,
                        PassengerDriveRepository passengerDriveRepository,
                        MessageRepository messageRepository,
                        ChatService chatService, NotificationService notificationService) {
        this.driveRepository = driveRepository;
        this.passengerDriveRepository = passengerDriveRepository;
        this.messageRepository = messageRepository;
        this.chatService = chatService;
        this.notificationService = notificationService;
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
        result.stream().sorted(Comparator.comparing(DriveVO::getStartTime).reversed());
        return result;
    }

    public List<DriveVO> findAllByStartTime(final String stTime) {
        LocalDateTime startTime = LocalDateTime.parse(stTime, DateTimeFormatter.ISO_DATE_TIME);
        List<Drive> drives = driveRepository.findAllDriveInFuture(startTime.minusHours(1));
        return drives.stream()
                .filter(drive -> drive.getStartTime().isBefore(startTime.plusHours(1))&&
                        drive.getStartTime().isAfter(startTime.minusHours(1)) && !drive.isArchive())
                .map(drive -> convertToVO(drive))
                .collect(Collectors.toList());
    }

    public List<DriveVO> findAllByDateRange(final String stTime, final String finTime) {
        LocalDateTime startTime = LocalDateTime.parse(stTime, DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime finalTime = LocalDateTime.parse(finTime, DateTimeFormatter.ISO_DATE_TIME);
        List<Drive> drives = driveRepository.findAllDriveInDateRange(startTime, finalTime);
        return drives.stream()
                .map(drive -> convertToVO(drive))
                .collect(Collectors.toList());
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
            if (drive.getEndTime().isBefore(LocalDateTime.now())&&!drive.isArchive()) {
                this.deleteById(drive.getId());
            }
            DriveVO driveVO = convertToVO(drive);
            driveVO.setPassengers(passengers);
            driveVO.setMessages(messages);
            return driveVO;
        }).collect(Collectors.toList());
        List<DriveVO> allDrives = driveRepository.findByDriverId(driverId).stream().map(drive -> {
            if (drive.getEndTime().isBefore(LocalDateTime.now())&&!drive.isArchive()) {
                this.deleteById(drive.getId());
            }
            List<Message> messages = messageRepository.findAllByDriveId(drive.getId());
            DriveVO driveVO = convertToVO(drive);
            driveVO.setMessages(messages);
            return driveVO;
        }).collect(Collectors.toList());
        allDrives.removeAll(result);
        allDrives.addAll(result);
        allDrives.stream().sorted(Comparator.comparing(DriveVO::getStartTime).reversed());
        return allDrives;
    }

    public List<DriveVO> findAllByPassengerId(final  Long passengerId) {
        List<PassengerDrive> passengerDriveList = passengerDriveRepository.findAllByPassengerId(passengerId);
        List<DriveVO> result = passengerDriveList.stream()
                .map(temp -> {
                    if (temp.getDrive().getEndTime().isBefore(LocalDateTime.now())&& !temp.getDrive().isArchive()) {
                        this.deleteById(temp.getDrive().getId());
                    }
                    UserVO driverVO = modelMapper.map(temp.getDrive().getDriver(), UserVO.class);
                    List<Message> messages = messageRepository.findAllByDriveId(temp.getDrive().getId());
                    DriveVO driveVO = convertToVO(temp.getDrive());
                    driverVO.setMark(temp.getPassengerToDriverMark());
                    driveVO.setPickUpPoint(temp.getStartPoint());
                    driveVO.setDriver(driverVO);
                    driveVO.setMessages(messages);
                    return driveVO;
                }).collect(Collectors.toList());
        result.stream().sorted(Comparator.comparing(DriveVO::getStartTime).reversed());
        return result;
    }

    public List<DriveVO> getDriveByPoints(final String startPoint, final String endPoint, final String date) {
        ObjectMapper objectMapper = new ObjectMapper();
        List<DriveVO> drives = null;
        try {
        Double[] startPointParsed = objectMapper.readValue(startPoint, Double[].class);
        Double[] endPointParsed = objectMapper.readValue(endPoint, Double[].class);
        drives = findAllByStartTime(date).stream()
                .filter(drive -> {
                        Double[] firstFiding = null, secondFiding = null;
                        int firstCoordinate = 0, secondCoordinate = 0;
                        try {
                        Double[][] temp = objectMapper.readValue(drive.getPath(), Double[][].class);
                        firstFiding = Arrays.stream(temp).filter((coordinate) -> isGoodDistanceBetween(startPointParsed, coordinate)).findFirst().orElse(null);
                        secondFiding = Arrays.stream(temp).filter((coordinate) -> isGoodDistanceBetween(endPointParsed, coordinate)).findFirst().orElse(null);
                        firstCoordinate = Arrays.stream(temp).collect((Collectors.toList())).indexOf(firstFiding);
                        secondCoordinate = Arrays.stream(temp).collect((Collectors.toList())).indexOf(secondFiding);
                        } catch (JsonParseException e){
                            throw new RuntimeException("Drive not found");
                        } catch (IOException e){
                            throw new RuntimeException("Drive not found");
                        }
                        return firstFiding!=null && secondFiding!=null && firstCoordinate<=secondCoordinate;
                    })
                    .collect(Collectors.toList());
        } catch (JsonParseException e){
            throw new RuntimeException("Drive not found");
        } catch (IOException e){
            throw new RuntimeException("Drive not found");
        }
         return drives;
    }

    public DriveVO addDrive(DriveVO driveVO) {
        Drive drive = modelMapper.map(driveVO, Drive.class);
        return convertToVO(driveRepository.save(drive));
    }

    public DriveVO updateDrive(Long id, String path) {
        return driveRepository.findById(id)
                .map(drive1 -> {
                    if(!drive1.isArchive()) {
                        drive1.setPath(path);
                        chatService.sendNotification("Driver has updated the route!", id, drive1.getDriver());
                       // notificationService.sendNotification(drive1.getDriver());
                    }
                    return convertToVO(driveRepository.save(drive1));
                })
                .orElseThrow((() -> new RuntimeException("Drive not found")));
    }

    public void deleteById(final Long id) {
        driveRepository.findById(id)
                .map(drive1 -> {
                    drive1.setArchive(true);
                    chatService.sendNotification("Driver has deleted the route!", id, drive1.getDriver());
                   // notificationService.sendNotification(drive1.getDriver());
                    return convertToVO(driveRepository.save(drive1));
                })
                .orElseThrow((() -> new RuntimeException("Drive not found")));
    }

    private DriveVO convertToVO(Drive drive) {
        DriveVO driveVO = modelMapper.map(drive, DriveVO.class);
        return driveVO;
    }


    private boolean isGoodDistanceBetween(Double[] firstPointDegree, Double[] secondPointDegree){
        double[] firstPoint = {Math.toRadians(firstPointDegree[0]), Math.toRadians(firstPointDegree[1])};
        double[] secondPoint = {Math.toRadians(secondPointDegree[0]), Math.toRadians(secondPointDegree[1])};
        double squareLatitude = Math.pow(Math.sin((firstPoint[0] - secondPoint[0])/2),2);
        double squareLongitude = Math.pow(Math.sin((firstPoint[1] - secondPoint[1])/2),2);
        double distance = 2*6371*Math.asin(Math.sqrt(squareLatitude +
                Math.cos(firstPoint[0])*Math.cos(secondPoint[0])*
                squareLongitude));
        return distance <= 1;
    }
}

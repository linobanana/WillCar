package com.exadel.carpoolfree.model.view;

import com.exadel.carpoolfree.model.Message;
import com.exadel.carpoolfree.model.Path;
import com.exadel.carpoolfree.model.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class DriveVO {

    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private int freePlaceCount;

    private UserVO driver;

    private Path path;

    private String startPoint;

    private String finPoint;

    public DriveVO() {
    }

    public DriveVO(LocalDateTime startTime, LocalDateTime endTime, int freePlaceCount, UserVO driver, Path path, String startPoint, String finPoint, List<Message> messages) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.freePlaceCount = freePlaceCount;
        this.driver = driver;
        this.path = path;
        this.startPoint = startPoint;
        this.finPoint = finPoint;
        this.messages = messages;
    }

    private List<Message> messages = new ArrayList<>();

    private List<UserVO> passengers = new LinkedList<>();

    public Long getId() {
        return id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public int getFreePlaceCount() {
        return freePlaceCount;
    }

    public UserVO getDriver() {
        return driver;
    }

    public Path getPath() {
        return path;
    }

    public List<UserVO> getPassengers() {
        return passengers;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public String getFinPoint() {
        return finPoint;
    }

    public void setFinPoint(String finPoint) {
        this.finPoint = finPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPassengers(List<UserVO> passengers) {
        this.passengers = passengers;
    }

    public void setPath(Path path) {
        this.path = path;
    }

    public void setDriver(UserVO driver) {
        this.driver = driver;
    }

    public void setFreePlaceCount(int freePlaceCount) {
        this.freePlaceCount = freePlaceCount;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
}

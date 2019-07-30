package com.exadel.carpoolfree.model.view;

import java.util.ArrayList;
import java.util.List;

public class UserForAdminVO {

    private Long id;

    private String name;

    private Long driverRating;

    private Long passengerRating;

    private Long points;

    private List<DriveVO> drives = new ArrayList<>();


    public UserForAdminVO() {

    }

    public UserForAdminVO(Long id, String name, Long driverRating, Long passengerRating, Double points,
                          List<DriveVO> drives) {
        this.id = id;
        this.name = name;
        this.driverRating = driverRating;
        this.passengerRating = passengerRating;
        this.drives = drives;
    }

    public List<DriveVO> getDrives() {
        return drives;
    }

    public void setDrives(List<DriveVO> drives) {
        this.drives = drives;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDriverRating() {
        return driverRating;
    }

    public void setDriverRating(Long driverRating) {
        this.driverRating = driverRating;
    }

    public Long getPassengerRating() {
        return passengerRating;
    }

    public void setPassengerRating(Long passengerRating) {
        this.passengerRating = passengerRating;
    }

    public Long getPoints() {
        return points;
    }

    public void setPoints(Long points) {
        this.points = points;
    }
}

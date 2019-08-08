package com.exadel.carpoolfree.model.view;

import com.exadel.carpoolfree.model.Car;
import com.exadel.carpoolfree.model.Role;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
public class UserVO {

    private Long id;

    private String name;

    private String photoUrl;

    private String phoneNumber;

    private String email;

    private String prefCommunication;

    private Set<Role> roles;

    private double driverRating;

    private double passengerRating;

    private List<Car> cars = new ArrayList<>();

    private int mark = 0;

    private String pickUpPoint;

    private double numOfKm;

    private double driveTime;

    public Long getId() {
        return id;
    }

    public String getPickUpPoint() {
        return pickUpPoint;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getPrefCommunication() {
        return prefCommunication;
    }

    public double getDriverRating() {
        return driverRating;
    }

    public void setDriverRating(double driverRating) {
        this.driverRating = driverRating;
    }

        public int getMark() {
                return mark;
        }

    public Set<Role> getRoles() {
        return roles;
    }

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setId(Long id) {
        this.id = id;
    }

        public void setMark(int mark) {
                this.mark = mark;
        }

    public double getPassengerRating() {
        return passengerRating;
    }

    public void setPassengerRating(double passengerRating) {
        this.passengerRating = passengerRating;
    }

    public void setPrefCommunication(String prefCommunication) {
        this.prefCommunication = prefCommunication;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setPickUpPoint(String pickUpPoint) {
        this.pickUpPoint = pickUpPoint;
    }

    public double getNumOfKm() {
        return numOfKm;
    }

    public void setNumOfKm(double numOfKm) {
        this.numOfKm = numOfKm;
    }

    public double getDriveTime() {
        return driveTime;
    }

    public void setDriveTime(double driveTime) {
        this.driveTime = driveTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}

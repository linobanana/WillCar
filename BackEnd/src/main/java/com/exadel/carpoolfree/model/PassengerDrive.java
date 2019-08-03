package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(PassengerDriveId.class)
@Table(name = "passenger_drive")
public class PassengerDrive {

    @Id
    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private User passenger;

    @Id
    @ManyToOne
    @JoinColumn(name = "drive_id")
    private Drive drive;

    @Column(name = "start_point")
    private String startPoint;

    @Column(name = "number_of_km")
    private Double numOfKm;

    @Column(name = "passenger_to_driver_mark")
    private int passengerToDriverMark;

    @Column(name = "driver_to_passenger_mark")
    private int driverToPassengerMark;
}

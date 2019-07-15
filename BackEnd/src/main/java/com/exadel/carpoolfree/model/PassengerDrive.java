package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "passenger_drive")
public class PassengerDrive {

    @EmbeddedId
    private PassengerDriveId id;

    @ManyToOne
    @MapsId("passengerId")
    private User passenger;

    @ManyToOne
    @MapsId("driveId")
    private Drive drive;

    @Column(name = "start_coordinate")
    private String startCoordinate;
}

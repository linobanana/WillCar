package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column
    private String email;

    @Column
    private String login;

    @Column
    private String password;

    @Column(name = "pref_communication")
    private String prefCommunication;

    @Column
    private int role;

    @Column(name = "driver_rating")
    private Long driverRating;

    @Column(name = "passenger_rating")
    private Long passengerRating;

    @OneToMany(
            mappedBy = "userId",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<Car> cars = new ArrayList<>();

    @OneToMany(
            mappedBy = "passenger",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<PassengerDrive> drives = new ArrayList<>();

    private List<PassengerRating> marksDriverToPassengers = new ArrayList<>();

    private DriverRating markPassengerToDriver;

}

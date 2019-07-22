package com.exadel.carpoolfree.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


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

    @JsonIgnore
    @Column
    private String login;

    @JsonIgnore
    @Column
    private String password;

    @Column(name = "pref_communication")
    private String prefCommunication;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> role;

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

    @OneToOne(
            mappedBy = "ratedUser"
    )
    private Mark driverMark;

    @OneToOne(
            mappedBy = "ratedBy"
    )
    private Mark passengerMark;

}

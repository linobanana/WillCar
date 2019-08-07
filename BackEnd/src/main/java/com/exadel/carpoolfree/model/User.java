package com.exadel.carpoolfree.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.HashSet;
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

    @Column(name = "name")
    private String name;

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

    @Column
    private boolean active;

    @Column(name = "pref_communication")
    private String prefCommunication;

    @Column
    private Long points;

    @Column(name = "photo_url")
    private String photoUrl;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

    public User(Long id){
        this.id = id;
    }

    @Column(name = "driver_rating")
    private double driverRating;

    @Column(name = "passenger_rating")
    private double passengerRating;

    @OneToMany(
            mappedBy = "userId",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    private List<Car> cars = new ArrayList<>();

    public User(Long id, String name, String phoneNumber,
                String email, String login, String password) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.login = login;
        this.password = password;
    }

    public User(String name, String phoneNumber, String email,
                String login, String password, boolean active, double driverRating,
                double  passengerRating) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.login = login;
        this.password = password;
        this.active = active;
        this.driverRating = driverRating;
        this.passengerRating = passengerRating;
    }

}

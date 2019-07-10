package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "drive")
public class Drive {

    @ManyToMany
    @JoinTable(
            name = "passenger_drive",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "drive_id"))
    Set<User> passengers;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "time_start")
    private LocalDateTime timeStart;
    @Column(name = "time_end")
    private LocalDateTime timeEnd;
    @Column(name = "free_place_count")
    private int freePlaceCount;
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
    @OneToOne
    @JoinColumn(name = "path")
    private Path path;
}

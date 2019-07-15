package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "drive")
public class Drive {

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

    @OneToMany(
            mappedBy = "drive",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PassengerDrive> passengers = new ArrayList<>();
}

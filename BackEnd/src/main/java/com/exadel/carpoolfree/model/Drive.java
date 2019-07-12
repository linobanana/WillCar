package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "free_place_count")
    private int freePlaceCount;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;

    @OneToOne
    @JoinColumn(name = "path")
    private Path path;
    @OneToOne
    @JoinColumn(name = "start_point")
    private Path startPoint;

    @OneToMany(
            mappedBy = "drive",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PassengerDrive> passengers = new ArrayList<>();
}

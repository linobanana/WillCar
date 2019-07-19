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
    public Drive(LocalDateTime startTime, LocalDateTime endTime, int freePlaceCount, User driver, Path path, Double startPoint) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.freePlaceCount = freePlaceCount;
        this.driver = driver;
        this.path = path;
        this.startPoint = startPoint;
    }

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

    @Column(name = "start_point")
    private Double startPoint;

    @OneToMany(
            mappedBy = "drive",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PassengerDrive> passengers = new ArrayList<>();

    @OneToMany()
    private List<Message> messages = new ArrayList<>();
}

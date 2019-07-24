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
import javax.persistence.Transient;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "drive")
public class Drive {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "path_id")
    private Path path;

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
    @Column(name = "start_point")
    private String startPoint;
    @Column(name = "fin_point")
    private String finPoint;

    public Drive(LocalDateTime startTime, LocalDateTime endTime, int freePlaceCount, User driver, Path path, String startPoint, String finPoint) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.freePlaceCount = freePlaceCount;
        this.driver = driver;
        this.path = path;
        this.startPoint = startPoint;
        this.finPoint = finPoint;
    }

    @OneToMany()
    private List<Message> messages = new ArrayList<>();

    @Transient
    private List<User> passengers = new LinkedList<>();

}

package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
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

    @Column(name = "start_point")
    private String startPoint;

    @Column(name = "fin_point")
    private String finPoint;

    @Column
    private String name;

    @Column(name = "sum_of_km")
    private Double sumOfKm;

    @Column(name = "route_url")
    private String routeUrl;

    @Column(name = "pathVO")
    private String path;

    @Column(name = "archive")
    private boolean archive = false;

    @Column(name = "segments_coords")
    private String segmentsCoords;

    @OneToMany()
    private List<Message> messages;

    public Drive(LocalDateTime startTime, LocalDateTime endTime, int freePlaceCount, User driver, String path, String startPoint, String finPoint) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.freePlaceCount = freePlaceCount;
        this.driver = driver;
        this.path = path;
        this.startPoint = startPoint;
        this.finPoint = finPoint;
    }

    public boolean isArchive() {
        return archive;
    }

    public void setArchive(boolean archive) {
        this.archive = archive;
    }
}

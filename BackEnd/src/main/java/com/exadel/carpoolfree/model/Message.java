package com.exadel.carpoolfree.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private String message;
    @Column(name = "drive_id")
    private Long driveId;
    @Column(name = "time")
    private String time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

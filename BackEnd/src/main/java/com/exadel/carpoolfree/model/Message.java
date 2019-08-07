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
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private String message;

    @Column(name = "drive_id")
    private Long driveId;

    @Column(name = "time")
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_notify")
    private boolean notify = false;


    public Message(String message, Long driveId, String time, User user, boolean notify) {
        this.message = message;
        this.driveId = driveId;
        this.time = LocalDateTime.parse(time, DateTimeFormatter.ISO_DATE_TIME);
        this.user = user;
        this.notify = notify;
    }

    public Message(String message, Long driveId, LocalDateTime time, User user, boolean notify) {
        this.message = message;
        this.driveId = driveId;
        this.time = time;
        this.user = user;
        this.notify = notify;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}

package com.exadel.carpoolfree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class PassengerDriveId implements Serializable {

    @Column(name = "passenger_id")
    private Long passengerId;

    @Column(name = "drive_id")
    private Long driveId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        PassengerDriveId that = (PassengerDriveId) o;
        return Objects.equals(passengerId, that.passengerId) &&
                Objects.equals(driveId, that.driveId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(passengerId, driveId);
    }
}
package com.exadel.carpoolfree.model.view;


public class MarkVO {

    private Long passengerId;

    private Long driveId;

    private Double mark;

    public MarkVO() {
    }

    public MarkVO(Long passengerId, Long driveId, Double mark) {
        this.passengerId = passengerId;
        this.driveId = driveId;
        this.mark = mark;
    }

    public Long getPassengerId() {
        return passengerId;
    }

    public Double getMark() {
        return mark;
    }

    public void setMark(Double mark) {
        this.mark = mark;
    }

    public Long getDriveId() {
        return driveId;
    }

    public void setDriveId(Long driveId) {
        this.driveId = driveId;
    }

    public void setPassengerId(Long passengerId) {
        this.passengerId = passengerId;
    }
}

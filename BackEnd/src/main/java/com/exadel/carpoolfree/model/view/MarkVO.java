package com.exadel.carpoolfree.model.view;


public class MarkVO {

    private Long passengerId;

    private Long driveId;

    private int mark;

    public MarkVO() {
    }

    public MarkVO(Long passengerId, Long driveId, int mark) {
        this.passengerId = passengerId;
        this.driveId = driveId;
        this.mark = mark;
    }

    public Long getPassengerId() {
        return passengerId;
    }

    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
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

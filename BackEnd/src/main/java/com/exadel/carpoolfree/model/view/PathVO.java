package com.exadel.carpoolfree.model.view;


public class PathVO {

    String startPoint;
    String endPoint;
    String dateTime;

    public PathVO() {
    }

    public PathVO(String startPoint, String endPoint, String dateTime) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.dateTime = dateTime;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }
}

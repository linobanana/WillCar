import { Injectable } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class DriveApiService extends ApiService{

  private static mapDrives(response: any) {
      response.forEach((drive) => {
        drive.date = drive.startTime.slice(8, 10) + drive.startTime.slice(4, 8) + drive.startTime.slice(0, 4);
        drive.time = drive.startTime.slice(11, 16);
        drive.segmentsCoords = JSON.parse(drive.segmentsCoords);
        drive.startPoint = JSON.parse(drive.startPoint);
        drive.finPoint = JSON.parse(drive.finPoint);
        drive.pickUpPoint = JSON.parse(drive.pickUpPoint);
        drive.passengers.forEach((passenger)=>{
          passenger.pickUpPoint = JSON.parse(passenger.pickUpPoint);
          return passenger;
        });
        return drive;
      });
      return response;
    }
   /* return <Drive[]>response;*/

  postPassengerTrip(trip:any ) {
    return super.post(`api/passengerDrive/passenger`, trip,DriveApiService.simpleResponse);
  }

  getProposedDrives(id) {
    return super.get(`api/drive/driver/driverId/${id}`, DriveApiService.mapDrives);
  }

  getBookedDrives(id) {
    return super.get(`api/drive/passenger/passengerId/${id}`, DriveApiService.mapDrives);
  }

  canselDrive(id) {
    return super.delete(`api/drive/driver/${id}`, {id});
  }

  canselPassengerDrive(driveId, id){
    return super.delete(`api/passengerDrive/passenger/${id}/driveId/${driveId}`, {id});
  }

  setRatingToDriver(markObject){
    return super.post(`api/passengerDrive/passenger/markToDriver`,markObject,DriveApiService.simpleResponse);
  }

  setRatingToPassenger(markObject){
    return super.post(`api/passengerDrive/driver/markToPassenger`, markObject,DriveApiService.simpleResponse);
  }

  private static simpleResponse(response: any) {
    return response;
  }
}

import { Injectable } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Drive} from "../../types/common";

@Injectable({
  providedIn: 'root'
})
export class DriveApiService extends ApiService{

  private static mapDrives(response: any) {
    return <Drive[]>response
  }

  postTrip(trip:any ) {
    return super.post(``, trip,DriveApiService.simpleResponse);
  }

  getProposedDrives(id) {
    return super.get(`api/drive/driverId/${id}`, DriveApiService.mapDrives);
  }

  getBookedDrives(id) {
    return super.get(`api/drive/passengerId/${id}`, DriveApiService.mapDrives);
  }

  canselDrive(id) {
    return super.delete(`api/drive/${id}`, {id});
  }

  canselPassengerDrive(driveId, id){
    return super.delete(`api/passenger/${id}/driveId/${driveId}`, {id});
  }

  setRatingToDriver(markObject){
    return super.post(`api/passenger/markToDriver`,markObject,DriveApiService.simpleResponse);
  }

  setRatingToPassenger(markObject){
    return super.post(`api/passenger/markToPassenger`, markObject,DriveApiService.simpleResponse);
  }

  private static simpleResponse(response: any) {
    return response;
  }
}

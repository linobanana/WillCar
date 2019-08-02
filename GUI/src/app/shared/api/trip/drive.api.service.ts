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

  private static simpleResponse(response: any) {
    return response;
  }
}

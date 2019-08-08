import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message, Drive, User} from "../../types/common";
import {ApiService} from "../../services/api.service";

@Injectable()
export class SocketService extends ApiService{
  private static mapDrive(response: any) {
    response.forEach((drive) => {
      drive.date = drive.startTime.slice(8, 10) + drive.startTime.slice(4, 8) + drive.startTime.slice(0, 4);
      drive.time = drive.startTime.slice(11, 16);
      return drive
    });
    return response;
  }

  getDrives(id) {
    let temp = super.get(`api/drive/userId/${id}`, SocketService.mapDrive);
    console.log(temp);
    return temp;
  }

}

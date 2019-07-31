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
    return <Drive[]>response
      /*id: response.id,
      name: response.name,
      startDate: response.startTime,
      endDate: response.endTime,
      messages: response.messages,
      passengers: response.passengers*/
    ;
  }

  getDrives(id) {
    let temp = super.get(`api/drive/userId/${id}`, SocketService.mapDrive);
    console.log(temp);
    return temp;
  }


  /*post(data: Message) {
    return this.http.post<Message>(this.url, data)
      .map((data: Message) => { return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  }*/
}

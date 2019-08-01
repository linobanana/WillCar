import { Injectable } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class TripApiService extends ApiService{

  postTrip(trip:any ) {
    return super.post(``, trip,TripApiService.simpleResponse);
  }

  private static simpleResponse(response: any) {
    return response;
  }
}
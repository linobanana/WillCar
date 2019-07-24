import {Time} from "@angular/common";

export class Car {
  model: string;
  number: string;
  color: string;
}
export class User {
  login: string;
  password: string;
  name: string;
  telNumber: string;
  email: string;
  preferredCommunication: string;
  cars: Car[];
  rating: number; //divide rating driver and passenger
  photoUrl: string;
}
export class Trip {
  freePlaceCount: number;
  startDate: Date;
  endDate: Date;
  startPoint: string;
  endPoint: string;
  driverCallNumber: string ;

}


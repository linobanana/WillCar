import {Time} from "@angular/common";

export class Car {
  id: number;
  model: string;
  number: string;
  color: string;
  userId: number;
}
export class User {
  id: number;
  login: string;
  password: string;
  name: string;
  telNumber: string;
  email: string;
  preferredCommunication: string;
  cars: Car[];
  rating: number;
  photoUrl: string;
}
export class Trip {
  date: Date;
  startPoint: string;
  endPoint: string;
  driverCallNumber: string;
}


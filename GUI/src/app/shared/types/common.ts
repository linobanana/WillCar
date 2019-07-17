import {Time} from "@angular/common";

export class Car {
  model: string;
  number: string;
  color: string;
}
export class User {
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


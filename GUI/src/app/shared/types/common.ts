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
  //roles: Role[];
  name: string;
  email: string;
  phoneNumber: string;
  prefCommunication: string;
  cars: Car[];
  photoUrl: string;
  driverRating: number;
  passengerRating: number;
  //mark: number;
  points: number;
  drives: Drive[];
  //pickUpPoint: Point[];
  //numOfKm: number;
}
export class Drive {
  id: number;
  startTime: string;
  endTime: string;
  startPoint: [number, number];
  finPoint: [number, number];
  name: string;
  passengers: User[];
  freePlaceCount: number;
  archive: boolean;
  //routeUrl: string;
  driver: User;
  messages: Message[];
  path:[];
  sumOfKm: number;
  isOpenSocket = false;
  //pickUpPoint: Point[];
}
export class Message {
  message: string;
  user: User;
  driveId:number;
  time:Date;
  notify:boolean;
}


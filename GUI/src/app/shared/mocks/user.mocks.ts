import {Car, Drive, User} from '../types/common';

export const USER: User = {
  id: 1,
  name: 'Misha Ivanov',
  phoneNumber: '+3752911111111',
  email: 'ivanov27098@gmail.com',
  prefCommunication: 'Chat',
  cars: [],
  driverRating: 5.7,
  photoUrl: 'http://telegram-downloads.ru/wp-content/uploads/2016/10/2-12.png',
  //roles: [],
  passengerRating: 5,
  //mark: number,
  points: 58,
  drives: [],
  //pickUpPoint: Point[];
  //numOfKm: number;
};
export const OPTIONS: string[] = [
  'Viber', 'E-mail', 'Telegram', 'Phone', 'Chat'
];

export const CAR: Car = {
  id: 1,
  model: "Volkswagen Polo",
  number: '8877HK-7',
  color: 'Grey',
  userId: 5
}


import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Car, User} from '../../types/common';

@Injectable()
export class ProfileApiService extends ApiService {
  private static mapUser(response: any) {
    return {
      id: response.id,
      name: response.name,
      phoneNumber: response.phoneNumber,
      email: response.email,
      prefCommunication: response.prefCommunication,
      cars: response.cars,
      driverRating: response.driverRating,
    };
  }

  private static mapUsers(response: any) {
    response.forEach((user) => {
      user.km = user.drives.reduce((a, b) => a + (b.sumOfKm || 0), 0);
      user.points = user.points || 0;
      user.numberOfDrives = user.drives.length;
      let countOfPassengers = 0;
      user.drives.forEach((drive) => {
        countOfPassengers += drive.passengers.length;
      });
      user.passengers = countOfPassengers;
      return user;
    });
    return response;
  }

  private static simpleResponse(response: any) {
    return response;
  }

  getUser(id) {
    return super.get(`api/users/${id}`, ProfileApiService.mapUser);
  }

  setUserCar(car: Car) {
    return super.post(`api/car`, car, ProfileApiService.simpleResponse);
  }

  changeUserOptions(userOptions) {
    return super.put(`api/users`, userOptions);
  }

  deleteUserCar(id) {
    return super.delete(`api/car/${id}`, {id}); //rewrite url
  }

  getUsers() {
    return super.get(`api/users`, ProfileApiService.mapUsers);
  }
}

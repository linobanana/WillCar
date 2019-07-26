import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {HttpResponse} from '@angular/common/http';
import {Car, User} from '../../types/common';

@Injectable()
export class ProfileApiService extends ApiService {
  private static mapUser(response: any) {
    return {
      id: response.id,
      name: response.firstName + ' ' + response.lastName,
      telNumber: response.phoneNumber,
      email: response.email,
      preferredCommunication: response.prefCommunication,
      cars: response.cars,
      rating: response.driverRating,
      photoUrl: ''
    };
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

  changeUserOptions(userOptions: User) {
    return super.put(`api/users`, userOptions);
  }

  deleteUserCar(id) {
    return super.delete(`api/car/${id}`, {id}); //rewrite url
  }

  // `api/users/${id}`

  // 'api/users/' + id
}

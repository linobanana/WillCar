import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {HttpResponse} from "@angular/common/http";
import {User} from "../../types/common";

@Injectable()
export class ProfileApiService extends ApiService{
  private static mapUser(response: HttpResponse<any>) {
    return response.body as User;
  }

  getUser(id) {
    return super.get(`api/users/${id}`, ProfileApiService.mapUser);
  }
}

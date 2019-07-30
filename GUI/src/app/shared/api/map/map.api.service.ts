import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class MapApiService extends ApiService {
  postDrive(body: any) {
    return super.post(`api/drive`, body);
  }
}

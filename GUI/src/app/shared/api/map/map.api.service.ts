import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Injectable()
export class MapApiService extends ApiService {
  private static mapDrives(response: any) {
    response.forEach((drive) => {
drive.path = JSON.parse(drive.path);
drive.startPoint = JSON.parse(drive.startPoint);
drive.finPoint = JSON.parse(drive.finPoint);
    });
    return response;
  }
  private static simpleResponse(response: any) {
    return response;
  }
  postDrive(body: any) {
    return super.post(`api/drive`, body);
  }
  postInfoToSearchDrive(body: any) {
    return super.post(`api/drive/points`, body, MapApiService.mapDrives);
  }
}

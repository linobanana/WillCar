import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Injectable()
export class MapApiService extends ApiService {
  private static mapDrives(response: any) {
    response.forEach((drive) => {
drive.path = JSON.parse(drive.path);
drive.segmentsCoords = JSON.parse(drive.segmentsCoords);
drive.startPoint = JSON.parse(drive.startPoint);
drive.finPoint = JSON.parse(drive.finPoint);
    });
    return response;
  }
  private static simpleResponse(response: any) {
    return response;
  }
  postDrive(body: any) {
    return super.post(`api/drive/driver`, body);
  }
  postInfoToSearchDrive(body: any) {
    return super.post(`api/drive/passenger/points`, body, MapApiService.mapDrives);
  }
}

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {mergeDeepRight, clone} from 'ramda';

@Injectable()
export class ApiService {
  private url = 'http://localhost:4200/';

  private defaultOptions: any;

  constructor(private httpClient: HttpClient) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    this.defaultOptions = {
      headers
    };

  }

  public get(
    endpointName: string,
    extractData?: (value: HttpResponse<any> | any) => {}
  ) {
    return this.request(
      endpointName,
      extractData || ApiService.extractData,
      null,
      'GET',
      {}
    );
  }

  public post(
    endpointName: string,
    data: any,
    extractData?: (value: HttpResponse<any> | any) => {},
    options?: any
  ) {
    return this.request(
      endpointName,
      extractData || ApiService.extractData,
      data,
      'POST',
      options
    );
  }

  public put(
    endpointName: string,
    data: any,
    extractData?: (value: HttpResponse<any> | any) => {}
  ) {
    return this.request(
      endpointName,
      extractData || ApiService.extractData,
      data,
      'PUT',
      {}
    );
  }

  public delete(
    endpointName: string,
    data: any,
    extractData?: (value: HttpResponse<any> | any) => {}
  ) {
    return this.request(
      endpointName,
      extractData || ApiService.extractData,
      data,
      'DELETE',
      {}
    );
  }

  private request(
    endpointName: string,
    extractData: (value: HttpResponse<any> | any) => {},
    data: any,
    method: string,
    options?: any
  ) {
    return this.doRequest(endpointName, extractData, data, method, options);
  }

  private doRequest(
    endpointName: string,
    extractData: (value: HttpResponse<any> | any) => {},
    data: any,
    method: string,
    options?: any
  ) {
    const endpointUrl = this.url + endpointName;

    if (!options) {
      options = {};
    }

    options = mergeDeepRight(this.defaultOptions, options);

    if (data) {
      options.body = clone(data);
    }

    return this.httpClient
      .request(method, endpointUrl, options)
      .pipe(map(extractData))
      .pipe(catchError(this.handleError.bind(this)));
  }

  private static extractData(res: HttpResponse<any> | any) {
    return res ? (res.docs || {}) : {};
  }

  private handleError(error: HttpResponse<any> | any) {
    console.log('error:', error);
    alert('ups :(');
  }
}

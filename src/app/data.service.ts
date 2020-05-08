import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {PrDetails} from './app.interface';

@Injectable()
export class DataService {

  msg;
  constructor(protected httpClient: HttpClient) {
  }

  getData(arg1) {

    return this.httpClient.get('http://127.0.0.1:8080/admin/' + arg1 )
      .map((response: Response) => response,
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
    });
  }

  getProjectData(arg1, arg2) {
    return this.httpClient.get('http://127.0.0.1:8080/admin/' + arg1 + '/' + arg2['id'])
      .map((response: Response) => response,
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
        });
  }
}

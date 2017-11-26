import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from './../../environments/environment';

import { Employee } from './../models/employee';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {
  api_url = 'http://localhost:8082';
  constructor(private http: Http) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new Headers(headersConfig);
  }

  // have to do something with async (no)
  getEmployeeById(id): Observable<any> {
    return this.http.get(`${this.api_url}/get_emp`, { headers: this.setHeaders() })
    .map((response: Response) => response.json());
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.api_url}/get_emp`, { headers: this.setHeaders() })
      .map((response: Response) => response.json());
  }

  getFIOsById(id): Observable<any> {
    return this.http.get(`${this.api_url}/get_fios`, { headers: this.setHeaders() })
      .map((response: Response) => response.json().filter(res => res.id === id));
  }

  getFIOs(): Observable<any> {
    return this.http.get(`${this.api_url}/get_fios`, { headers: this.setHeaders() })
      .map((response: Response) => response.json());
  }

  putEmployee(employee: Employee): any {
    console.log(employee);
    return this.http.post(
      this.api_url + '/add_emp',
      JSON.stringify(employee),
      { headers: this.setHeaders() })
      .map((response: Response) => response.json()).subscribe();
  }

}

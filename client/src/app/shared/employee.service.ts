import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

import { Employee } from './../models/employee';

@Injectable()
export class EmployeeService {

  constructor(private apiService: ApiService) { }

  getEmployees(): Observable<any> {
    return this.apiService.get('/get_employees');
  }

  getEmployeeDetail(tab): Observable<any> {
    return this.apiService.post('/get_employeeDetail', { tab: tab });
  }

  getPositions(): Observable<any> {
    return this.apiService.get('/get_positionsName');
  }

  getSubdivisions(): Observable<any> {
    return this.apiService.get('/get_subdivisionsName');
  }

  getDepartmentsBySubdivision(subdivision): Observable<any> {
    return this.apiService.post('/get_departmentsBySubdivision', { subdivision: subdivision });
  }

  formatDate(date): string {
    const day = date.slice(8, 10);
    const year = date.slice(11, 15);
    let month = '';

    switch (date.slice(4, 7)) {
      case 'Nov':
        month = '10';
        break;
      case 'Jan':
        month = '01';
        break;
      case 'Feb':
        month = '02';
        break;
      case 'Mar':
        month = '03';
        break;
      case 'Apr':
        month = '04';
        break;
      case 'May':
        month = '05';
        break;
      case 'Jun':
        month = '06';
        break;
      case 'Jul':
        month = '07';
        break;
      case 'Aug':
        month = '08';
        break;
      case 'Sep':
        month = '09';
        break;
      case 'Oct':
        month = '11';
        break;
      case 'Dec':
        month = '12';
        break;
    }

    return year + '-' + month + '-' + day;
  }

}

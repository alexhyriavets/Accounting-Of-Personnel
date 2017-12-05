import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

import { Employee } from './../models/employee';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

  constructor(private apiService: ApiService) { }

  editEmployeeInfo(employeeInfo): Observable<any> {
    return this.apiService.put('/edit_employeeInfo', employeeInfo);
  }

  addEmployeePrepare(employee): void {
    const person = {
      fullName: employee.firstName + ' ' + employee.secondName,
      patronymic: employee.patronymic,
      birthDate: employee.birthDate,
      sex: employee.sex,
      adress: employee.adress,
      scienceDegree: employee.scienceDegree,
    };

    this.addPerson(person).subscribe();

    employee.arrivalDate = this.getCurrentDate();

    this.getPersonIdByName(person.fullName)
      .toPromise()
      .then((id) => {
        const emp = {
          tab_number: this.getRandomInt(10000, 99999),
          arrivalDate: employee.arrivalDate,
          dismissalDate: null,
          employment: employee.employment,
          rate: employee.rate,
          subdivision_id: employee.subdivision,
          department_id: employee.department,
          position_code: employee.position,
          person_id: id[0].id,
        };

        this.addEmployee(emp).subscribe();
      });
  }

  addEmployee(emp): Observable<any> {
    return this.apiService.post('/add_employee', emp);
  }

  addPerson(person): Observable<any> {
    return this.apiService.post('/add_person', person);
  }

  getEmployeesCount(): Observable<any> {
    return this.apiService.get('/get_employeesCount');
  }

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

  getPersonIdByName(fullName): Observable<any> {
    return this.apiService.post('/get_personIdByName', { fullName: fullName });
  }

  dismissEmployee(data): Observable<any> {
    return this.apiService.put('/dissmis_employee', data);
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

  getCurrentDate(): string {
    const currentDate = new Date();
    let day = currentDate.getDay().toString();
    let month = (currentDate.getMonth() + 1).toString();
    const year = currentDate.getFullYear().toString();

    if (+day < 10) {
      day = '0' + day;
    }
    if (+month < 10) {
      month = '0' + month;
    }

    return `${year}-${month}-${day}`;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

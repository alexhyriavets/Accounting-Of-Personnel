import { Component, OnInit } from '@angular/core';

import { Employee } from './../models/employee';

import { AddEmployeeComponent } from './../shared/add-employee/add-employee.component';

import { EmployeeService } from './../shared/employee.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.sass']
})
export class EmployeesListComponent implements OnInit {
  displayedRows = ['# Tab', 'Name', 'Position', 'Subdivision', 'Department', 'arrivalDate'];
  employees: any;
  searchText: string;
  loading = true;

  constructor(
    public employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  // TODO: format arrival date (done)
  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employee => {
        employee.map(item => item.arrival = item.arrival.slice(0, 10));
        this.employees = employee;
      });

    this.loading = false;
  }

}

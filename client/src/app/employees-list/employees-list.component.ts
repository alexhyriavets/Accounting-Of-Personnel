import { Component, OnInit } from '@angular/core';

import { Employee } from './../models/employee';

import { AddEmployeeComponent } from './../shared/add-employee/add-employee.component';

import { EmployeeService } from './../shared/employee.service';

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

  // TODO: format arrival date
  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employee => {
        this.employees = employee;
     //   this.employees = this.employees.map(item => this.employeeService.formatDate(item.arrival));
      });

    // console.log(this.employees.arrival);
    // this.employees.map(item => this.employeeService.formatDate(item.arrival));

    this.loading = false;
  }

}

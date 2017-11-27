import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Employee } from './../models/employee';

import { AddEmployeeComponent } from './../shared/add-employee/add-employee.component';

import { EmployeeService } from './../shared/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.sass']
})
export class EmployeesListComponent implements OnInit {
  displayedRows = ['ID', 'Name', 'Sex', 'Adress'];
  employees: Employee[];
  searchText: string;
  loading = true;

  constructor(
    public employeeService: EmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    // this.employeeService.getFIOs().subscribe(fio => this.employees = fio);
    this.loading = false;
  }

}

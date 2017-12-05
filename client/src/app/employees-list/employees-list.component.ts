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
  currentEmployees: any;
  loading = true;
  searchText: any;
  subdivisions: any;
  isOnlyDismissed = false;
  isOnlyScienceDegree = false;

  constructor(
    public employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.getEmployees();
    this.getSubdivisions();
  }

  onScienceDegreeCheck(): void {
    if (this.isOnlyScienceDegree) {
      this.currentEmployees = this.currentEmployees.filter(emp => emp.scienceDegree !== null);
    }
  }

  onDismissedCheck(): void {
    if (this.isOnlyDismissed) {
      this.currentEmployees = this.currentEmployees.filter(emp => emp.dismissalDate === null);
    }
  }

  onSubdivisionSelect(searchSub: string): void {
    if (searchSub === 'showAll') {
      this.currentEmployees = this.employees;
      this.onDismissedCheck();
      this.onScienceDegreeCheck();
    } else {
      this.currentEmployees = this.employees.filter(emp => emp.subdivision.includes(searchSub));
      this.onDismissedCheck();
      this.onScienceDegreeCheck();
    }
  }

  getSubdivisions(): void {
    this.employeeService.getSubdivisions()
      .subscribe(subdiv => this.subdivisions = subdiv);
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employee => {
        employee.map(item => item.arrival = item.arrival.slice(0, 10));
        this.employees = employee;
        this.currentEmployees = employee;
      });

    this.loading = false;
  }

}

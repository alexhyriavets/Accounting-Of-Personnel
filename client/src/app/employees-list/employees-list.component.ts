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
  searchText = '';
  subdivisions: any;
  hasScienceDegree = false;
  isShowDismissed = false;
  isOnlyRetirenmentAge = false;

  constructor(
    public employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.getEmployees();
    this.getSubdivisions();
  }

  onSubdivChange(curSub: string): void {
    if (curSub === 'showAll') {
      this.currentEmployees = this.employees;
    } else {
      this.currentEmployees = this.employees.filter(emp => emp.subdivision.includes(curSub));
    }
  }

  // onShowDismissedChange(): void {
  //   if (this.isShowDismissed) {
  //     this.currentEmployees = this.employees;
  //   }
  // }

  // onRetirementAgeCheck(): void {
  // const date = new Date();
  // const curYear = date.getFullYear();
  // const birthYear = +this.employees[0].birthDate.slice(0, 4);
  //   if (this.isOnlyRetirementAge) {
  //     this.currentEmployees = this.currentEmployees.filter(emp => (curYear - +emp.birthDate.slice(0, 4)) > 55);
  //   }
  // }

  // onScienceDegreeCheck(): void {
  //   if (this.isOnlyScienceDegree) {
  //     this.currentEmployees = this.currentEmployees.filter(emp => emp.scienceDegree !== null);
  //   }
  // }

  // onSubdivisionSelect(searchSub: string = 'showAll'): void {
  //   if (searchSub === 'showAll') {
  //     this.currentEmployees = this.employees;
  //     this.onScienceDegreeCheck();
  //     this.onRetirementAgeCheck();
  //     this.onShowDismissedChange();
  //   } else {
  //     this.currentEmployees = this.employees.filter(emp => emp.subdivision.includes(searchSub));
  //     this.onScienceDegreeCheck();
  //     this.onRetirementAgeCheck();
  //     this.onShowDismissedChange();
  //   }
  // }

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

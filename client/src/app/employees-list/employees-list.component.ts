import { Component, OnInit } from '@angular/core';

import { Employee } from './../models/employee';

import { AddEmployeeComponent } from './../shared/add-employee/add-employee.component';

import { EmployeeService } from './../shared/employee.service';
import { ExcelService } from '../shared/excel.service';

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
    private excelService: ExcelService
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

  exportToExcel(): void {
    this.excelService.exportAsExcelFile(this.currentEmployees, 'employees');
  }

}

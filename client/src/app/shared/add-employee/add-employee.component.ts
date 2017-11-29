import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from './../custom-validators';
import { ShowErrorsComponent } from './../show-errors';

import { Employee } from './../../models/employee';

import { EmployeeService } from './../employee.service';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {
  employee: any;
  addForm: FormGroup;
  positions: any;
  subdivisions: any;
  departments: any;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.addForm = formBuilder.group({
      'firstName': [null, [Validators.required]],
      'secondName': [null, [Validators.required]],
      'patronymic': [null, [Validators.required]],
      'birthDate': [null, [Validators.required]],
      'sex': [null, [Validators.required]],
      'adress': [null, [Validators.required]],
      'position': [null, [Validators.required]],
      'subdivision': [null, [Validators.required]],
      'department': [null, [Validators.required]],
      'employment': [null, [Validators.required]],
      'rate': [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getPositions();
    this.getSubdivisions();
  }

  onSubdivisionSelect(subdivision): void {
    this.getDepartmentsBySubdivision(subdivision);
  }

  addEmployee(emp) {
    emp.birthDate = this.formatDate(emp.birthDate.toDateString());
    console.log(emp);

    this.addForm.reset();
  }

  getPositions(): void {
    this.employeeService.getPositions()
      .subscribe(position => this.positions = position);
  }

  getSubdivisions(): void {
    this.employeeService.getSubdivisions()
      .subscribe(subdiv => this.subdivisions = subdiv);
  }

  getDepartmentsBySubdivision(subdivision): void {
    this.employeeService.getDepartmentsBySubdivision(subdivision)
      .subscribe(dep => this.departments = dep);
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

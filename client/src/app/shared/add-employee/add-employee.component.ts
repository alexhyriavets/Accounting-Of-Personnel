// TODO: make validation work with form below!

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
  rForm: FormGroup;
  name: string;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.rForm = formBuilder.group({
      'FIO': [null, [Validators.required, CustomValidators.testFio]],
      'Sex': [null, Validators.required],
      'Date_of_Birth': [null, Validators.required],
      'Adress': [null, Validators.required],
      'Date_of_Dismissal': [null],
      'Science_Degree': [null],
    });
  }

  ngOnInit() { }

  addEmployee(emp) {
    if (emp.Date_of_Birth) {
      emp.Date_of_Birth = this.formatDate(emp.Date_of_Birth.toDateString());
    }
    if (emp.Date_of_Dismissal) {
      emp.Date_of_Dismissal = this.formatDate(emp.Date_of_Dismissal.toDateString());
    }

    // uncomment to add emplyees to database
    this.employeeService.putEmployee(emp);

    this.rForm.reset();
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

import { Component, OnInit, Inject, NgModule } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { Employee } from './../../models/employee';

import { EmployeeService } from './../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {
  employee: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() { }

  onSubmit(): void {
    if (this.employee.Date_of_Birth) {
      this.employee.Date_of_Birth = this.formatDate(this.employee.Date_of_Birth.toDateString());
    }
    if (this.employee.Date_of_Dismissal) {
      this.employee.Date_of_Dismissal = this.formatDate(this.employee.Date_of_Dismissal.toDateString());
    }

    // uncomment to add emplyees to database
    this.employeeService.putEmployee(this.employee);

    this.dialogRef.close();
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}

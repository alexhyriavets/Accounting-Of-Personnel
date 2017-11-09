import { Component, OnInit, Inject } from '@angular/core';

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

  ngOnInit() {
  }

  onSubmit(): void {
    // const dob = this.employee.Date_of_Birthday.toString();
    // this.employee.Date_of_Birthday = Date.parse(dob);
    // this.employee.Date_of_Dismissal = this.employee.Date_of_Dismissal.toISOString();

    console.log(this.employee);

    // this.employeeService.putEmployee(this.employee);

    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

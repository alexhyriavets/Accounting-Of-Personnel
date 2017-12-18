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
      'firstName': [null, [Validators.required, Validators.pattern(/[a-zA-Z] /)]],
      'secondName': [null, [Validators.required, Validators.pattern(/[a-zA-Z] /)]],
      'patronymic': [null, [Validators.required, Validators.pattern(/[a-zA-Z] /)]],
      'birthDate': [null, [Validators.required]],
      'sex': [null, [Validators.required]],
      'adress': [null, [Validators.required]],
      'position': [null, [Validators.required]],
      'subdivision': [null, [Validators.required]],
      'department': [null, [Validators.required]],
      'employment': [null, [Validators.required]],
      'rate': [null, [Validators.required]],
      'scienceDegree': [null],
    });
  }

  ngOnInit() {
    this.getPositions();
    this.getSubdivisions();
  }

  onSubdivisionSelect(subdivision): void {
    this.getDepartmentsBySubdivision(subdivision);
  }

  onSubmit(emp) {
    emp.birthDate = this.employeeService.formatDate(emp.birthDate.toDateString());

    this.employeeService.addEmployeePrepare(emp);

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

}

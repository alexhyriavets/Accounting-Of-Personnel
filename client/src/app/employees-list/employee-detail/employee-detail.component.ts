import { Component, OnInit } from '@angular/core';

import { EmployeeService } from './../../shared/employee.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.sass']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any;
  positions: any;
  subdivisions: any;
  departments: any;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getEmployeeDetail();
    this.getPositions();
    this.getSubdivisions();
  }

  public getDepartmentsBySubdivision(subdivision): void {
    this.employeeService.getDepartmentsBySubdivision(subdivision)
      .subscribe(dep => this.departments = dep);
  }

  getSubdivisions(): void {
    this.employeeService.getSubdivisions()
      .subscribe(subdiv => this.subdivisions = subdiv);
  }

  getPositions(): void {
    this.employeeService.getPositions()
      .subscribe(position => this.positions = position);
  }

  getEmployeeDetail(): void {
    const tab = +this.route.snapshot.paramMap.get('tab');
    this.employeeService.getEmployeeDetail(tab)
      .subscribe(data => {
        data[0].arrivalDate = data[0].arrivalDate.slice(0, 10);
        data[0].birthDate = data[0].birthDate.slice(0, 10);
        data[0].dismissalDate = data[0].dismissalDate !== null ? data[0].dismissalDate.slice(0, 10) : '-';
        this.employee = data[0];
        this.getDepartmentsBySubdivision(this.employee.subdId);
      });
  }

  getPositionCode(position): any {
    let isFind = false;
    for (const pos in this.positions) {
      if (this.positions[pos].name === position) {
        isFind = true;
        return this.positions[pos].code;
      }
    }
    if (!isFind) {
      return position;
    }
  }

  getSubdivisionId(subd): any {
    let isFind = false;
    for (const pos in this.subdivisions) {
      if (this.subdivisions[pos].subdivision === subd) {
        isFind = true;
        return this.subdivisions[pos].id;
      }
    }
    if (!isFind) {
      return subd;
    }
  }

  getDepartmentId(dep): any {
    let isFind = false;

    for (const pos in this.departments) {
      if (this.departments[pos].name === dep) {
        isFind = true;
        return this.departments[pos].id;
      }
    }
    if (!isFind) {
      return dep;
    }
  }

  onSaveChanges(): void {
    this.employee.position = this.getPositionCode(this.employee.position);
    this.employee.department = this.getDepartmentId(this.employee.department);
    this.employee.subdivision = this.getSubdivisionId(this.employee.subdivision);

    if (this.employee.dismissalDate === '-') {
      this.employee.dismissalDate = null;
    }
    console.log(this.employee);
    this.employeeService.editEmployeeInfo(this.employee).subscribe();
  }

  onDismiss(): void {
    this.employee.dismissalDate = this.employeeService.getCurrentDate();
    this.employeeService.dismissEmployee({
      tab: this.employee.tab,
      dismissalDate: this.employee.dismissalDate
    })
      .subscribe();
  }

}

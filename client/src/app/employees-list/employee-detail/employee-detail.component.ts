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
  employees = [];

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getEmployeeDetail();
  }

  getEmployeeDetail() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.employeeService.getFIOsById(id)
      .subscribe(emp => this.employees = emp);
  }

}

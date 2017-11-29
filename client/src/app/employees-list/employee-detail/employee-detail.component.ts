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

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getEmployeeDetail();
  }

  getEmployeeDetail(): void {
    const tab = +this.route.snapshot.paramMap.get('tab');
    this.employeeService.getEmployeeDetail(tab)
      .subscribe(data => {
        data[0].arrivalDate = data[0].arrivalDate.slice(0, 10);
        data[0].birthDate = data[0].birthDate.slice(0, 10);
        data[0].dismissalDate = data[0].dismissalData ? data[0].dismissalDate.slice(0, 10) : '-';
        this.employee = data[0];
      });
  }

}

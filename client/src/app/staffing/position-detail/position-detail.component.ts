import { Component, OnInit } from '@angular/core';

import { SubdivisionService } from './../../shared/subdivision.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.sass']
})
export class PositionDetailComponent implements OnInit {
  id = +this.route.snapshot.paramMap.get('id');
  code = +this.route.snapshot.paramMap.get('code');
  employees: any;
  displayedRows = ['#', 'Name', 'Position', 'Salary'];

  constructor(
    private subdivisionService: SubdivisionService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPositionDetail();
  }

  getPositionDetail(): void {
    this.subdivisionService.getPositionDetail(this.id, this.code)
      .subscribe(data => this.employees = data);
  }

}

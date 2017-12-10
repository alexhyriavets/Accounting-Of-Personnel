import { Component, OnInit } from '@angular/core';

import { SubdivisionService } from './../../shared/subdivision.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-staffing-detail',
  templateUrl: './staffing-detail.component.html',
  styleUrls: ['./staffing-detail.component.sass']
})
export class StaffingDetailComponent implements OnInit {
  staffing: any;
  displayedRows = ['Position', 'Count'];

  constructor(
    private subdivisionService: SubdivisionService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getStaffing();
  }

  getStaffing(): void {
    const id = +this.route.snapshot.paramMap.get('tab');

    this.subdivisionService.getStaffing(id)
      .subscribe(item => this.staffing = item);
  }

}

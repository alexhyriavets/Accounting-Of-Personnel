import { Component, OnInit } from '@angular/core';

import { SubdivisionService } from './../shared/subdivision.service';

@Component({
  selector: 'app-staffing',
  templateUrl: './staffing.component.html',
  styleUrls: ['./staffing.component.sass']
})
export class StaffingComponent implements OnInit {
  subdivisions: any;
  displayedRows = ['#', 'Subdivision', 'Count of Employees'];
  searchText: any;

  constructor(private subdivisionService: SubdivisionService) { }

  ngOnInit() {
    this.getSubdivisions();
  }

  getSubdivisions(): void {
    this.subdivisionService.getAllSubdivisions()
      .subscribe(sub => this.subdivisions = sub);
  }

}
